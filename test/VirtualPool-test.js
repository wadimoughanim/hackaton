const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VirtualPool", function () {
  it("Should deposit and withdraw correctly", async function () {
    // Get the Contract Factory for the MockToken
    const MockToken = await ethers.getContractFactory("MockToken");
    // Deploy MockToken with initial supply
    const mockToken = await MockToken.deploy("Mock Token", "MTK");
    await mockToken.deployed();

    // Deploy VirtualPool
    const VirtualPool = await ethers.getContractFactory("VirtualPool");
    const pool = await VirtualPool.deploy();
    await pool.deployed();

    const [owner] = await ethers.getSigners();

    // Get initial balance
    const initialOwnerBalance = await mockToken.balanceOf(owner.address);

    // Approve the pool to spend owner's tokens
    await mockToken.connect(owner).approve(pool.address, initialOwnerBalance);

    // Deposit to the pool
    await pool.connect(owner).deposit(mockToken.address, initialOwnerBalance.div(2));
    expect(await pool.balanceOf(mockToken.address, owner.address)).to.equal(initialOwnerBalance.div(2));

    // Withdraw from the pool
    await pool.connect(owner).withdraw(mockToken.address, owner.address, initialOwnerBalance.div(4));
    expect(await pool.balanceOf(mockToken.address, owner.address)).to.equal(initialOwnerBalance.div(4));
  });
});
