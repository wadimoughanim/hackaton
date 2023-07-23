const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const OrderBook = await hre.ethers.getContractFactory("OrderBook");
  const orderBook = await OrderBook.deploy();

  console.log("OrderBook deployed to:", orderBook.address);

  const VirtualPool = await hre.ethers.getContractFactory("VirtualPool");
  const virtualPool = await VirtualPool.deploy();

  console.log("VirtualPool contract address:", virtualPool.address);

  // Create 50 different limit orders
  for (let i = 0; i < 50; i++) {
    // Create bid orders
    const price = 100 + i * 10; // Change as needed
    const amount = 10; // Change as needed
    const isBid = true; // Change as needed
    await orderBook.createLimitOrder(price, amount, isBid);

    // Create ask orders
    const priceAsk = 200 + i * 10; // Change as needed
    const amountAsk = 10; // Change as needed
    const isAsk = false; // Change as needed
    await orderBook.createLimitOrder(priceAsk, amountAsk, isAsk);
  }

  console.log("50 different limit orders created.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
