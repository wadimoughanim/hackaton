////////
window.addEventListener('load', async () => {
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          await ethereum.enable();
          startApp();
      } catch (error) {
          console.error("User denied account access...");
      }
  }
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      startApp();
  }
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

async function startApp() {
  const contractAddress = '0x7200D778eb4846e0dFad5278A1505bbCF64655B2';
  const abi = [
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
          "name": "floatingRate",
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
          "name": "price",
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
          "name": "price",
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
    }
  ]; 
  const contract = new web3.eth.Contract(abi, contractAddress);

  const connectButton = document.getElementById('connectButton');
  connectButton.addEventListener('click', async () => {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      connectButton.style.display = 'none';
      document.getElementById('newOrderForm').style.display = 'block';
      document.getElementById('orderbook').style.display = 'block';
  });

  const newOrderForm = document.getElementById('newOrderForm');
  newOrderForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const notional = document.getElementById('notional').value;
      const isBid = document.getElementById('isBid').value === 'true';
      const fixedRate = document.getElementById('fixedRate').value;

      await contract.methods.createLimitOrder(notional, fixedRate, isBid).send({ from: accounts[0] });
      renderOrderbook();
  });

  const marketOrderButton = document.getElementById('marketOrderButton');
  marketOrderButton.addEventListener('click', async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      const notional = document.getElementById('notional').value;
      const isBid = document.getElementById('isBid').value === 'true';

      await contract.methods.marketOrder(notional, isBid).send({ from: accounts[0] });
      renderOrderbook();
  });

  async function renderOrderbook() {
      const bidOrderLength = await contract.methods.getLength(true).call();
      const askOrderLength = await contract.methods.getLength(false).call();

      const orderbookDiv = document.getElementById('orderbook');
      orderbookDiv.innerHTML = '';

      for (let i = 0; i < bidOrderLength; i++) {
          const order = await contract.methods.OrderMap(i).call();
          if (order.isBid) {
              orderbookDiv.innerHTML += `<div>Bid Order: ${order.price} @ ${order.amount}</div>`;
          }
      }

      for (let i = 0; i < askOrderLength; i++) {
          const order = await contract.methods.OrderMap(i).call();
          if (!order.isBid) {
              orderbookDiv.innerHTML += `<div>Ask Order: ${order.price} @ ${order.amount}</div>`;
          }
      }
  }

  renderOrderbook();
}
