import { ethers, run } from "hardhat";

async function main() {
  await run("compile");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Swap = await ethers.getContractFactory("InterestRateSwap");
  
  const partyA = deployer.address; // Assuming deployer is partyA
  const partyB = "0x..."; // Replace with the address of partyB
  const notional = ethers.utils.parseEther("1"); // Replace with the actual notional amount
  const fixedRate = ethers.utils.parseUnits("0.01", 18); // Replace with the actual fixed rate
  const variableRate = ethers.utils.parseUnits("0.02", 18); // Replace with the actual variable rate
  const maturity = 240; // Replace with the actual maturity (in blocks)
  const leverage = ethers.utils.parseUnits("1", 18); // Replace with the actual leverage

  const swap = await Swap.deploy(partyA, partyB, notional, fixedRate, variableRate, maturity, leverage);

  console.log("Swap contract deployed to:", swap.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
