const provider = new ethers.providers.Web3Provider(window.ethereum);

// Your contract address
const contractAddress = "0x807e1Fcc526BD6C1bcE98591bD0a55030c7524dD";

// Your contract ABI
const contractABI = [
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
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
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
      "inputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];


let signer;
let contract;

window.onload = function() {
    document.getElementById("connect-button").addEventListener("click", async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            document.getElementById("deposit-button").disabled = false;
            document.getElementById("withdraw-button").disabled = false;
            alert(`Connecté avec succès avec l'adresse ${accounts[0]}`);
        } catch (err) {
            console.error(err);
            alert("Une erreur s'est produite. Voir la console pour plus de détails.");
        }
    });

    document.getElementById("deposit-button").addEventListener("click", async () => {
        const amount = document.getElementById("deposit-amount").value;
        const weiAmount = ethers.utils.parseEther(amount);
        try {
            const tx = await contract.deposit({ value: weiAmount });
            console.log(tx);
            alert("Transaction de dépôt envoyée. Voir la console pour plus de détails.");
        } catch (err) {
            console.error(err);
            alert("Une erreur s'est produite lors du dépôt. Voir la console pour plus de détails.");
        }
    });

    document.getElementById("withdraw-button").addEventListener("click", async () => {
        const amount = document.getElementById("withdraw-amount").value;
        const recipient = document.getElementById("recipient").value;
        try {
            const weiAmount = ethers.utils.parseEther(amount);
            const tx = await contract.withdraw(recipient, weiAmount);
            console.log(tx);
            alert("Transaction de retrait envoyée. Voir la console pour plus de détails.");
        } catch (err) {
            console.error(err);
            alert("Une erreur s'est produite lors du retrait. Voir la console pour plus de détails.");
        }
    });
}
