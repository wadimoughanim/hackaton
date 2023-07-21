pragma solidity ^0.8.0;

contract InterestRateSwap {
    address public partyA;
    address public partyB;
    uint256 public notional;
    uint256 public fixedRate;
    uint256 public variableRate;
    uint256 public maturity; // en blocs
    uint256 public leverage;
    uint256 public lastSwapTime;
    uint256 public swapInterval = 5; // 5 secondes

    constructor(
        address _partyA,
        address _partyB,
        uint256 _notional,
        uint256 _fixedRate,
        uint256 _variableRate,
        uint256 _maturity,
        uint256 _leverage
    ) {
        partyA = _partyA;
        partyB = _partyB;
        notional = _notional;
        fixedRate = _fixedRate;
        variableRate = _variableRate;
        maturity = block.number + _maturity;
        leverage = _leverage;
        lastSwapTime = block.timestamp;
    }

    function swap() public {
        require(block.timestamp > lastSwapTime + swapInterval, "Wait for the next swap interval");
        require(block.number <= maturity, "The swap contract has reached maturity");

        uint256 swapValue = (notional * (fixedRate - variableRate)) / 100;
        swapValue *= leverage;

        require(address(this).balance >= swapValue, "Not enough balance for the swap");

        // Transfert du swapValue de partyA à partyB
        (bool success, ) = partyB.call{value: swapValue}("");
        require(success, "Transfer failed.");

        lastSwapTime = block.timestamp;
    }

    receive() external payable {}
}
