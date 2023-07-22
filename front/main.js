// L'ABI de votre contrat
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_notional",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fixedRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maturity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_frequency",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "accrueInterest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "accruedAmount",
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
      "name": "finalizeSwap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fixedRate",
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
      "name": "frequency",
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
      "name": "maturity",
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
      "name": "notional",
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
      "name": "partyA",
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
      "name": "partyB",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_partyA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_partyB",
          "type": "address"
        }
      ],
      "name": "setParties",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "variableRate",
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
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

// Adresse de votre contrat
const contractAddress = "0x71C95911E9a5D330f4D621842EC243EE1343292e";

// Initialiser la variable de contrat
let contract;

// Quand la fenêtre se charge
window.addEventListener('load', async () => {
    // Metamask - Détecter MetaMask et se connecter
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Demande d'approbation de l'utilisateur pour se connecter à MetaMask
            await ethereum.enable();

            // Obtenir les détails du compte
            const accounts = await web3.eth.getAccounts();

            // Créer une instance de contrat
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("L'utilisateur a refusé l'accès à MetaMask.");
        }
    }
    // Si Metamask n'est pas installé
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Si le navigateur ne supporte pas Metamask
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

// Quand le bouton de connexion est cliqué
document.getElementById("connectMetamask").addEventListener("click", async () => {
    // Se connecter à Metamask et changer le texte du bouton
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const button = document.querySelector('.enableEthereumButton');
    button.innerHTML = `Connected: ${account}`;
});
