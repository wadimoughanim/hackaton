// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VirtualPool is Ownable {
    // Mapping of account balances
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    function transfer(address from, address to, uint256 amount) public {
        require(balances[from] >= amount, "Insufficient balance in 'from' account");

        balances[from] -= amount;
        balances[to] += amount;
    }
    function withdraw() public {
        uint256 amountToWithdraw = balances[msg.sender];
        require(amountToWithdraw > 0, "No funds to withdraw");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amountToWithdraw);
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
    function marginCall() public view returns (bool) {
        //margin = call from Cartesi
        return balanceOf(msg.sender) >= 1;
    }
}
