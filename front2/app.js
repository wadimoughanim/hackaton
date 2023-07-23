window.addEventListener('load', async () => {
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          await ethereum.enable();
          initApp();
      } catch (error) {
          console.error("User denied account access");
      }
  } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      initApp();
  } else {
      console.log('Non-Ethereum browser detected. Install MetaMask');
  }
});

async function initApp() {
  const orderBookAddress = '0xBe9fC32Dd347baF86f2ca1D3c3a627C0D58e5759'; // Replace with your OrderBook contract address
  const virtualPoolAddress = '0x650EB93d0807373f18344e597dd0Cf53f62A9CD5'; // Replace with your VirtualPool contract address
  const orderBookAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isBid",
          "type": "bool"
        }
      ],
      "name": "MarketOrderNotExecuted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "AskOrders",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "BestAsk",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "BestBid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "BidOrders",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "IdToTransaction",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "payerfixed",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiverfixed",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "fixedRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "floatingRateId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "asOfBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maturityBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "OrderMap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fixedRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isBid",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "StateOfTransactions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "TransactionsAtMaturity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "__init__",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "orderID",
          "type": "uint256"
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fixedRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isBid",
          "type": "bool"
        }
      ],
      "name": "createLimitOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "delta",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "payerfixed",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "receiverfixed",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "fixedRate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "floatingRateId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "asOfBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maturityBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct OrderBook.Transaction",
          "name": "transaction",
          "type": "tuple"
        }
      ],
      "name": "executeTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "isBid",
          "type": "bool"
        }
      ],
      "name": "getLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastBlockSeen",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isBid",
          "type": "bool"
        }
      ],
      "name": "marketOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "periodToMaturity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pool",
      "outputs": [
        {
          "internalType": "contract VirtualPool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "isBid",
          "type": "bool"
        }
      ],
      "name": "popLimitOrder",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "orderID",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "orderID",
          "type": "uint256"
        }
      ],
      "name": "pushLimitOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setIdTrans",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]; // Replace with your OrderBook contract ABI
  const virtualPoolAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "marginCall",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // 

  const orderBookContract = new web3.eth.Contract(orderBookAbi, orderBookAddress);
  const virtualPoolContract = new web3.eth.Contract(virtualPoolAbi, virtualPoolAddress);

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  // Deposit
  document.getElementById('deposit').onclick = function() {
      const amount = document.getElementById('depositAmount').value;
      virtualPoolContract.methods.deposit().send({from: account, value: web3.utils.toWei(amount, 'ether')});
  }

  // Withdraw
  document.getElementById('withdraw').onclick = function() {
      virtualPoolContract.methods.withdraw().send({from: account});
  }

  // Transfer
  document.getElementById('transfer').onclick = function() {
      const to = document.getElementById('transferAddress').value;
      const amount = document.getElementById('transferAmount').value;
      virtualPoolContract.methods.transfer(account, to, amount).send({from: account});
  }

  // Market Order
  document.getElementById('marketOrder').onclick = function() {
      const amount = document.getElementById('marketOrderAmount').value;
      const isBid = document.getElementById('marketOrderType').value.toLowerCase() === 'bid';
      orderBookContract.methods.marketOrder(amount, isBid).send({from: account});
  }
  // Check Transactions
  document.getElementById('checkTransactions').onclick = function() {
    virtualPoolContract.methods.StateOfTransactions().send({from: account});
}
  // Limit Order
  document.getElementById('limitOrder').onclick = function() {
      const fixedRate = document.getElementById('limitOrderFixedRate').value;
      const amount = document.getElementById('limitOrderAmount').value;
      const isBid = document.getElementById('limitOrderType').value.toLowerCase() === 'bid';
      orderBookContract.methods.createLimitOrder(fixedRate, amount, isBid).send({from: account});
  }

  // Cancel Order
  document.getElementById('cancelOrder').onclick = function() {
      const orderID = document.getElementById('cancelOrderID').value;
      orderBookContract.methods.cancelOrder(orderID).send({from: account});
  }

  // Best Bid
  document.getElementById('bestBid').onclick = async function() {
      const bestBid = await orderBookContract.methods.BestBid().call();
      document.getElementById('bestBidDisplay').innerText = 'Best bid: ' + bestBid;
  }

  // Best Ask
  document.getElementById('bestAsk').onclick = async function() {
      const bestAsk = await orderBookContract.methods.BestAsk().call();
      document.getElementById('bestAskDisplay').innerText = 'Best ask: ' + bestAsk;
  }

  // Check balance periodically
  setInterval(() => {
      virtualPoolContract.methods.balanceOf(account).call().then((balance) => {
          document.getElementById('balance').innerText = web3.utils.fromWei(balance, 'ether') + ' ETH';
      });
  }, 1000);
}
