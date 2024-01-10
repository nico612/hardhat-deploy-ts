import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers"
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "solidity-coverage";
import "hardhat-abi-exporter";
import fs from  "fs";
import { utils } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";

import "./tasks/commonTask"


const { isAddress, getAddress, formatUnits, parseUnits } = utils;

dotenv.config({path: `${__dirname}/.env`}); //load env

const defaultNetwork = "localhost";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (error) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
        optimizer: {
          enabled: true,
          runs: 200
          }
        }
      },
      {
        version: "0.8.7",
        settings: {
        optimizer: {
          enabled: true,
          runs: 200
          }
        }
      }
    ]
  },
  defaultNetwork,
  networks: { 
    hardhat:{
      
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.infuraKey}`,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    bsc: {
      allowUnlimitedContractSize: true,
      url: "https://bsc-dataseed1.binance.org/",
      chainId: 56,
      accounts: {
        mnemonic: mnemonic()
      }
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: {
        mnemonic: mnemonic()
      }
      //live: false, //指定是否是一个线上的链，localhost and hardhat where the default is false
      //tags: ["bsctest"] //设置网络别名，可通过hre.network.tags获得
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.infuraKey}`,
      accounts: {
        mnemonic: mnemonic()
      }
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.infuraKey}`,
      live: true,
      accounts:{
        mnemonic: mnemonic()
      }
    },
    sepolior: {
      url: `https://sepolia.infura.io/v3/${process.env.infuraKey}`,
      chainId: 11155111,
      accounts: {
        mnemonic: mnemonic(),
        initialIndex: 0,
      },
      
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      // 97:0 //chainId: accounts[0], 指定链
      // 1: 0xA296a3d5F026953e17F472B497eC29a5631FB51B //指定账户
      //指定网络
      bscTestnet: 0
    },
    user1: {
      default: 1
    }
  },
  etherscan: {
    apiKey: {
      bsc: process.env.bscApiKey as string,
      rinkeby: process.env.infuraKey as string,
      mainnet: process.env.infuraKey as string,
      ropsten: process.env.infuraKey as string
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD'
  },
  abiExporter: {
    path: './build/generate/json',
    only: ["TestERC20"],
    except: ['.*Mock$'],
    clear: true,
    flat: true,
    runOnCompile: true
  },
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


task("blockNumber", "Prints the block number", async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

async function addr(ethers: HardhatEthersHelpers, addr: string) {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts.includes(addr)) {
    return accounts[accounts.indexOf(addr)];
  }
  throw `Could not normalize address: ${addr}`;
}

task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(
      await addr(ethers, taskArgs.account)
    );
    console.log(formatUnits(balance, "ether"), "ETH");
  });

export default config;
