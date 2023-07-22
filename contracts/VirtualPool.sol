// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VirtualPool is Ownable {
    // Mapping of account balances
    mapping(address => uint256) private _balances;

    function deposit() public payable {
        _balances[msg.sender] += msg.value;
    }

    function withdraw(address account, uint256 amount) public onlyOwner {
        require(_balances[account] >= amount, "Insufficient balance");

        payable(account).transfer(amount);
        _balances[account] -= amount;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
}
