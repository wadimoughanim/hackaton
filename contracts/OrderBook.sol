// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./VirtualPool.sol";

contract OrderBook {

   struct Order{
        uint256 id;
        uint256 fixedRate;
        uint256 time;
        uint256 amount;
        address owner;
        bool isBid;
    }
    struct Transaction{
        uint256 id;
        address payerfixed;
        address receiverfixed;
        uint256 fixedRate;
        uint256 floatingRateId;
        uint256 asOfBlock;
        uint256 maturityBlock;
        uint256 amount;
    }
    
    uint256 public setId;
    uint256 public setIdTrans;
    uint256[] public BidOrders;
    uint256[] public AskOrders;
    mapping (uint256 => Order) public OrderMap;
    mapping (uint256=>uint256[]) public TransactionsAtMaturity;
    mapping (uint256=>Transaction) public IdToTransaction;
    uint256 public delta=5;
    uint256 public periodToMaturity=10;
    uint256 public lastBlockSeen=block.number;
    VirtualPool public pool;




    function  __init__()  public {
        setId = 0;
        BidOrders = new uint256[](0);
        AskOrders = new uint256[](0); 
        pool = new VirtualPool();
       

    }

    //functions used for test
    //__________________________________________________________
    function BestBid() public view returns (uint256) {
        if (BidOrders.length == 0) {
            revert("OrderBook: BestBid: no bid orders");
        }
        return OrderMap[BidOrders[BidOrders.length-1]].fixedRate;
    }
    function BestAsk() public view returns (uint256) {
        if (AskOrders.length == 0) {
            revert("OrderBook: BestAsk: no ask orders");
        }
        return OrderMap[AskOrders[AskOrders.length-1]].fixedRate;
    }
    function getLength(bool isBid) public view returns (uint256) {
        return isBid ? BidOrders.length : AskOrders.length;
    }
    //___________________________________________________________


    function firstBetween(uint256 orderID1, uint orderID2) internal view returns (bool) {
        Order memory order1 = OrderMap[orderID1];
        Order memory order2 = OrderMap[orderID2];
        //require(order1.isBid == order2.isBid,"OrderBook: firstBetween: orders must be of the same type");

        if (order1.fixedRate < order2.fixedRate && order1.isBid || order1.fixedRate > order2.fixedRate && !order1.isBid) {
            return true;
        }
        if (order1.fixedRate == order2.fixedRate) {
            return order1.time < order2.time;
        }
        return false;
        
    }
    
    function executeOrder(address limitMember, address marketMember, uint256 fixedRateValue, uint256 amount, bool isBid) internal {
        
        uint256 floatingRateId = 1000000;//id du floating rate
        
        address payerFixed = isBid? limitMember : marketMember;
        address receiverFixed = isBid? marketMember : limitMember;
        // query Nodet

        IdToTransaction[setIdTrans]=Transaction(setIdTrans,payerFixed,receiverFixed,fixedRateValue,floatingRateId,block.number,block.number+periodToMaturity,amount);
        TransactionsAtMaturity[block.number+periodToMaturity].push(setIdTrans);
        setIdTrans++;
        

        
    }
    

    // define interface nodet
    // interface RateContract {
    //     function executeRequest() external returns (bytes32);
    // }

    function executeTransaction(Transaction memory transaction) public {
        uint256 floatingRate = 5;
        pool.transfer(transaction.payerfixed,transaction.receiverfixed,transaction.amount*transaction.fixedRate*periodToMaturity);
        pool.transfer(transaction.receiverfixed,transaction.payerfixed,transaction.amount*floatingRate*periodToMaturity);
    }
    function StateOfTransactions() public {
        

        for (uint256 i=lastBlockSeen;i<block.number;i++){
            uint256[] memory TransactionId = TransactionsAtMaturity[i];
            for (uint256 j=0;j<TransactionId.length;j++){
                executeTransaction(IdToTransaction[TransactionId[j]]);
            }
        }
        lastBlockSeen = block.number;
        
    }
    





    function pushLimitOrder(uint256 orderID) public {
        Order memory order = OrderMap[orderID];
        uint256[] storage orders = order.isBid ? BidOrders : AskOrders;

        uint256 i = 0;
        while (i < orders.length && firstBetween(orders[i], orderID)) {
            i++;
        }

        // Add a new element at the end
        orders.push(orderID);

        // Shift elements to right of 'i' by one position
        if (i < orders.length - 1) {
            for (uint256 j = orders.length - 2; j != i; j--) {
                orders[j + 1] = orders[j];
            }
        }

        // Insert orderID at 'i'
        orders[i] = orderID;
    }





    function createLimitOrder(uint256 fixedRate, uint256 amount, bool isBid) public {
            Order memory order = Order(setId,fixedRate,block.timestamp,amount,msg.sender,isBid);

            
            //require(pool.balanceOf(msg.sender) >= /*amount*delta*fixedRate*periodToMaturity*/ 10, "Insufficient balance");
            OrderMap[setId] = order;
            pushLimitOrder(setId);
            setId++;
            
        }


    function popLimitOrder(bool isBid) public returns (uint256 orderID) {
        if (isBid) {
            require(BidOrders.length > 0, "No more bid orders");
            orderID = BidOrders[BidOrders.length - 1];
            BidOrders.pop();
        } else {
            require(AskOrders.length > 0, "No more ask orders");
            orderID = AskOrders[AskOrders.length - 1];
            AskOrders.pop();
        }
        return orderID;
    }



    event MarketOrderNotExecuted(uint256 amount,bool isBid);
    

    function marketOrder(uint256 amount, bool isBid) public {
        uint256[] memory orders = isBid ? BidOrders : AskOrders;
        uint256 remainingAmount = amount;
        
        
    
        while (remainingAmount > 0) {
            if (orders.length == 0) {
                emit MarketOrderNotExecuted(remainingAmount,isBid);
                revert("OrderBook: marketOrder: no remaining orders");    
            }

            uint256 fixedRateValue = isBid ? BestBid() : BestAsk();
            Order memory order = OrderMap[popLimitOrder(isBid)];
            uint256 availableAmount = order.amount;

            if (availableAmount > remainingAmount) {
                
                
                executeOrder(order.owner,msg.sender,fixedRateValue,amount,isBid);      
                order.amount -= remainingAmount;
                pushLimitOrder(order.id);
                
                remainingAmount = 0;  
            }
                       
            else {
                
                executeOrder(order.owner,msg.sender,fixedRateValue,order.amount,isBid);
                remainingAmount -= availableAmount;
            }
            
            

        }
        require(pool.marginCall(), "Insufficient balance");
        
    }
    
    

    function cancelOrder(uint256 orderID) public {
        Order memory order = OrderMap[orderID];
        uint256[] storage orders = order.isBid ? BidOrders : AskOrders;
        uint256 i = 0;
        while (orders[i] != orderID) {
            i++;
        }
        removeOrder(i,order.isBid);
        delete OrderMap[orderID];
    }
    function removeOrder(uint256 i, bool isBid) internal {
        uint256[] storage orders = isBid ? BidOrders : AskOrders;
        orders[i] = orders[orders.length - 1];
        orders.pop();
    }

    function removeFirstOrder(bool isBid) internal {
        uint256[] storage orders = isBid ? BidOrders : AskOrders;
        orders[0] = orders[orders.length - 1];
        orders.pop();
    }



}
