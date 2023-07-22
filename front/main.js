window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        document.getElementById("status").innerText = "Non-Ethereum browser detected. You should consider trying MetaMask!";
    }

    document.getElementById("connectMetamask").addEventListener("click", async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            document.getElementById("status").innerText = "Connected: " + account;
        } catch (error) {
            document.getElementById("status").innerText = "Error: " + error.message;
        }
    });
});
