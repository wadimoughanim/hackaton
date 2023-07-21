pragma solidity ^0.8.0;

contract InterestRateSwap {
    address public partyA;
    address public partyB;
    uint256 public notional;
    uint256 public fixedRate;
    uint256 public variableRate;
    uint256 public maturity;
    uint256 public leverage;

    uint256 public accruedAmount;

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
        maturity = block.timestamp + _maturity;
        leverage = _leverage;
    }

    function accrueInterest() public {
        require(block.timestamp <= maturity, "The swap contract has reached maturity");

        uint256 swapValue = (notional * (fixedRate - variableRate)) / 100;
        swapValue *= leverage;

        accruedAmount += swapValue;
    }

    function finalizeSwap() public {
        require(block.timestamp > maturity, "The swap contract hasn't reached maturity yet");

        // Transfert du montant accumulé de partyA à partyB
        (bool success, ) = partyB.call{value: accruedAmount}("");
        require(success, "Transfer failed.");
    }

    receive() external payable {}
}
