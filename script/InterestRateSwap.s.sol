// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/InterestRateSwap.sol";

contract DeployInterestRateSwap is Script {
    constructor() Script(msg.sender) {}

    function run() public override {
        InterestRateSwap swap = new InterestRateSwap(
            1000000, // _notional
            3 * 10**16, // _fixedRate
            10000, // _maturity
            1 // _frequency
        );
    }
}
