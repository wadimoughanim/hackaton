// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VirtualPool is Ownable {
    // Mapping of account balances
    mapping(address => uint256) private _balances;

    function deposit() public payable {
        _balances[msg.sender] += msg.value;
    }
    function marginCall(address account, uint256 amount) public onlyOwner{
        require(_balances[account] >= amount, "Insufficient balance");
    }
    function transfer(address from, address to, uint256 amount) public onlyOwner {
        require(_balances[from] >= amount, "Insufficient balance in 'from' account");

        _balances[from] -= amount;
        _balances[to] += amount;
    }
    function withdraw() public {
        uint256 amountToWithdraw = _balances[msg.sender];
        require(amountToWithdraw > 0, "No funds to withdraw");

        _balances[msg.sender] = 0;
        payable(msg.sender).transfer(amountToWithdraw);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
}
