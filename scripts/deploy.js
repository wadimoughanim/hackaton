async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const VirtualPool = await ethers.getContractFactory("VirtualPool");
  const virtualPool = await VirtualPool.deploy();

  console.log("VirtualPool contract address:", virtualPool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
