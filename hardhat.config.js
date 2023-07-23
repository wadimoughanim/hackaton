require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const ALCHEMY_API_KEY = process.env.API_ALCHEMY_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.13",
  networks: {
    hardhat: {
    },
    polygon: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 20000000000 // 20 GWEI
    }
  }
}
