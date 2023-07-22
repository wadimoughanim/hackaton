// TestTK.s.sol

pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/TestTK.sol";

contract TokenERC20Script is Script {
    TestTK public token;

    function setUp() public {
        token = new TestTK(1000000);
    }

    function run() public {
        // Example of interaction: minting more tokens.
        token.mint(address(this), 1000000);
    }
}
