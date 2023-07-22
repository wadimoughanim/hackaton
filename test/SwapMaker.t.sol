// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SwapMaker.sol";

contract SwapMakerTest is Test {
    SwapMaker public swapmaker;

    function setUp() public {
        address partyAAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // Fixed Leg
        address partyBAddress = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Floating Leg
        address tokenAddress = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512; // Add the address of the token here
        uint256 t = 100000;
        uint256 nominal = 30000000000000000;
        uint256 T = 5000;
        uint256 fixedRate = 180;
        uint256 floatingRate = 180; // Add the floating rate here
        uint256 leverage = 100000; // Add the leverage here

        swapmaker = new SwapMaker(partyAAddress, partyBAddress, tokenAddress, t, nominal, T, fixedRate, floatingRate, leverage);
        swapmaker.settleSwap();
    }
        

    function testConstructor() public {
        assertEq(swapmaker.fixedLeg(), 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        assertEq(swapmaker.floatingLeg(), 0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        assertEq(swapmaker.fixedRate(), 180);
        // Add other assertions for the other fields

    }
}