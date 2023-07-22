// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../src/InterestRateSwap.sol";
import "forge-std/Script.sol";

contract InterestRateSwapScript is Script {
    InterestRateSwap public swap;

    constructor() Script() {}

    function run() public {
        swap = new InterestRateSwap(100000, 30000000000000000, 5000, 180);
    }
}
