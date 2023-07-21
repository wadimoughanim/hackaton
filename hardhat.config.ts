import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "ethers";
import { task } from "hardhat/config";
import { resolve } from "path";

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const ALCHEMY_PROJECT_URL = process.env.ALCHEMY_PROJECT_URL as string;

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    polygon: {
      url: `https://polygon-mumbai.infura.io/v3/${ALCHEMY_PROJECT_URL}`,
      accounts: ['0x'+PRIVATE_KEY],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${ALCHEMY_PROJECT_URL}`,
      accounts: ['0x'+PRIVATE_KEY],
    },
  },
};

export default config;
