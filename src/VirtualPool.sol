// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyPool {
    IERC20 public token;
    address public owner;

    struct Pool {
        uint256 balance;
        bool exists;
    }

    mapping(address => Pool) public pools;

    constructor(IERC20 _token) {
        token = _token;
        owner = msg.sender; // Set the owner to the address who deployed the contract
    }

    function deposit(uint256 _amount) public {
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        
        Pool storage pool = pools[msg.sender];
        if(!pool.exists) {
            pool.exists = true;
        }
        pool.balance += _amount;
    }

    function getBalance(address _owner) public view returns (uint256) {
        require(pools[_owner].exists, "Pool does not exist");
        return pools[_owner].balance;
    }

    function withdraw(uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can withdraw");
        require(token.transfer(owner, _amount), "Transfer failed");
    }
}
