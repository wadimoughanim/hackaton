require('dotenv').config();
const hre = require("hardhat");
require("@nomiclabs/hardhat-waffle");

async function main() {
  // Configuration for Mumbai Polygon
  const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/XP5XpWtZqRAAahi0awY90CmRZhDJyBxo');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying contracts with the account:", wallet.address);

  // Adjust the gas price manually to Mumbai's one
  const gasPrice = ethers.utils.parseUnits('1', 'gwei');

  const OrderBook = await ethers.getContractFactory("OrderBook");
  const OrderBookWithSigner = OrderBook.connect(wallet);
  const orderBook = await OrderBookWithSigner.deploy();

  console.log("OrderBook deployed to:", orderBook.address);

  const VirtualPool = await ethers.getContractFactory("VirtualPool");
  const VirtualPoolWithSigner = VirtualPool.connect(wallet);
  const virtualPool = await VirtualPoolWithSigner.deploy();

  console.log("VirtualPool contract address:", virtualPool.address);

  // Create 2 different limit orders
  for (let i = 0; i < 2; i++) {
    // Create bid orders
    const price = 100 + i * 10; // Change as needed
    const amount = 10; // Change as needed
    const isBid = true; // Change as needed
    const orderBookWithSigner = orderBook.connect(wallet);
    await orderBookWithSigner.createLimitOrder(price, amount, isBid, {gasPrice: gasPrice});

    // Create ask orders
    const priceAsk = 200 + i * 10; // Change as needed
    const amountAsk = 10; // Change as needed
    const isAsk = false; // Change as needed
    await orderBookWithSigner.createLimitOrder(priceAsk, amountAsk, isAsk, {gasPrice: gasPrice});
  }

  console.log("2 different limit orders created.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
