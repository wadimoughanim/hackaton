const contractAddress = "0xYourContractAddress"; // Replace with your contract address
const contractABI = []; // Replace with your contract ABI

document.getElementById('connect').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        document.getElementById('setParties').addEventListener('click', async () => {
            const transaction = await contract.setParties(accounts[0], "0xOtherPartyAddress"); // Replace with the other party address
            await transaction.wait();
        });
        
        document.getElementById('accrueInterest').addEventListener('click', async () => {
            const transaction = await contract.accrueInterest();
            await transaction.wait();
        });
        
        document.getElementById('finalizeSwap').addEventListener('click', async () => {
            const transaction = await contract.finalizeSwap();
            await transaction.wait();
        });
    } else {
        console.log('Metamask is not installed');
    }
});
