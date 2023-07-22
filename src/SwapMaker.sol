pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InterestRateSwap {
    address public fixedLeg;
    address public floatingLeg;
    IERC20 public token;
    uint256 public t;
    uint256 public nominal;
    uint256 public T;
    uint256 public fixedRate;
    uint256 public floatingRate;
    uint256 public leverage;

    constructor(
        address _fixedLeg,
        address _floatingLeg,
        address _tokenAddress,
        uint256 _t,
        uint256 _nominal,
        uint256 _T,
        uint256 _fixedRate,
        uint256 _floatingRate,
        uint256 _leverage
    ) {
        fixedLeg = _fixedLeg;
        floatingLeg = _floatingLeg;
        token = IERC20(_tokenAddress);
        t = _t;
        nominal = _nominal;
        T = _T;
        fixedRate = _fixedRate;
        floatingRate = _floatingRate;
        leverage = _leverage;
    }

    function settleSwap() public {
        int256 swapValue = int256(leverage) * int256(nominal) * (int256(fixedRate) - int256(floatingRate)) * int256(t) / int256(T);

        if (swapValue > 0) {
            // Check if the contract is allowed to transfer tokens on behalf of the floating party
            require(token.allowance(floatingLeg, address(this)) >= uint256(swapValue), "Contract is not allowed to transfer tokens on behalf of the floating party");

            // Transfers from the floating rate party to the fixed rate party
            require(token.transferFrom(floatingLeg, fixedLeg, uint256(swapValue)));
        } else {
            // Check if the contract is allowed to transfer tokens on behalf of the fixed party
            require(token.allowance(fixedLeg, address(this)) >= uint256(-swapValue), "Contract is not allowed to transfer tokens on behalf of the fixed party");

            // Transfers from the fixed rate party to the floating rate party
            require(token.transferFrom(fixedLeg, floatingLeg, uint256(-swapValue)));
        }
    }
}
