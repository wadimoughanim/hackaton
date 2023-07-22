pragma solidity ^0.8.0;

contract InterestRateSwap {
    address public partyA;
    address public partyB;
    uint256 public notional;
    uint256 public fixedRate; // Multiplied by 1e18 for precision
    uint256 public variableRate; // Multiplied by 1e18 for precision
    uint256 public maturity;
    uint256 public frequency;
    uint256 public accruedAmount;

    constructor(
        uint256 _notional,
        uint256 _fixedRate,
        uint256 _maturity,
        uint256 _frequency
    ) {
        notional = _notional;
        fixedRate = _fixedRate;
        maturity = block.number + _maturity;
        frequency = _frequency;
    }

    function setParties(address _partyA, address _partyB) public {
        require(partyA == address(0) && partyB == address(0), "Parties are already set");
        partyA = _partyA;
        partyB = _partyB;
    }

    function accrueInterest() public {
        require(block.number <= maturity, "The swap contract has reached maturity");
        require(partyA != address(0) && partyB != address(0), "Parties are not set yet");

        // Make the variable rate vary based on the current block number
        variableRate = (block.number % 1000) * 1e14;

        uint256 numberOfBlocks = block.number - maturity;
        uint256 swapValueFixed = (fixedRate * notional * numberOfBlocks) / (360 * 1e18);
        uint256 swapValueVariable = (variableRate * notional * numberOfBlocks) / (360 * 1e18);
        uint256 swapValue = swapValueFixed > swapValueVariable ? swapValueFixed - swapValueVariable : swapValueVariable - swapValueFixed;

        accruedAmount += swapValue;
    }

    function finalizeSwap() public {
        require(block.number > maturity, "The swap contract hasn't reached maturity yet");
        require(partyA != address(0) && partyB != address(0), "Parties are not set yet");

        // Transfert du montant accumulé de partyA à partyB
        (bool success, ) = partyB.call{value: accruedAmount}("");
        require(success, "Transfer failed.");
    }

    receive() external payable {}
}
