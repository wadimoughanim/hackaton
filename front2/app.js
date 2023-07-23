const web3 = new Web3(window.ethereum);

// Remplacer par l'ABI du contrat et l'adresse du contrat déployé
const orderBookABI = [
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
];
const orderBookAddress = '0x903779094c9A8De7EAd1Ef3fCefac2fF7B12A22b';

const orderBookContract = new web3.eth.Contract(orderBookABI, orderBookAddress);

document.getElementById('connect').addEventListener('click', async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  console.log('Connected with account ', accounts[0]);
});

document.getElementById('getOrders').addEventListener('click', async () => {
  const bidOrders = await orderBookContract.methods.BidOrders().call();
  const askOrders = await orderBookContract.methods.AskOrders().call();
  document.getElementById('orders').innerText = `Bid Orders: ${bidOrders}\nAsk Orders: ${askOrders}`;
});

document.getElementById('createOrder').addEventListener('click', async () => {
  const fixedRate = document.getElementById('fixedRate').value;
  const amount = document.getElementById('amount').value;
  const isBid = document.getElementById('isBid').value;
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  await orderBookContract.methods.createLimitOrder(fixedRate, amount, isBid).send({ from: accounts[0] });
});

document.getElementById('placeMarketOrder').addEventListener('click', async () => {
  const amount = document.getElementById('marketAmount').value;
  const isBid = document.getElementById('marketIsBid').value;
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  await orderBookContract.methods.marketOrder(amount, isBid).send({ from: accounts[0] });
});

document.getElementById('checkState').addEventListener('click', async () => {
  await orderBookContract.methods.StateOfTransactions().call();
  const state = await orderBookContract.methods.lastBlockSeen().call();
  document.getElementById('state').innerText = `State: ${state}`;
});
