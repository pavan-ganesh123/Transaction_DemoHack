document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Function to fetch and display wallet information
        const displayWalletInfo = async () => {
            try {
                const response = await fetch('/wallet/generate', {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch wallet information: ${response.status} ${response.statusText}`);
                }
                const { address, privateKey } = await response.json();
                document.getElementById('address').innerText = address;
                document.getElementById('privateKey').innerText = privateKey;

                // Check balance
                const balanceResponse = await fetch(`/wallet/balance/${address}`);
                if (!balanceResponse.ok) {
                    throw new Error(`Failed to fetch balance: ${balanceResponse.status} ${balanceResponse.statusText}`);
                }
                const { balance } = await balanceResponse.json();
                document.getElementById('balance').innerText = balance;
            } catch (error) {
                console.error('Error fetching wallet information:', error.message);
            }
        };

        // Display wallet information when the page loads
        await displayWalletInfo();

        // Add event listener for "Generate Wallet" button
        const generateWalletBtn = document.getElementById('generateWalletBtn');
        generateWalletBtn.addEventListener('click', async () => {
            try {
                await displayWalletInfo();
            } catch (error) {
                console.error('Error generating wallet:', error.message);
            }
        });

        // Send transaction
        const sendTransactionBtn = document.getElementById('sendTransactionBtn');
        sendTransactionBtn.addEventListener('click', async () => {
            const senderAddress = document.getElementById('senderAddress').value;
            const senderPrivateKey = document.getElementById('senderPrivateKey').value;
            const receiverAddress = document.getElementById('receiverAddress').value;
            const amount = document.getElementById('amount').value;

            try {
                // Add code to send transaction
                const transactionResult = await sendTransaction(senderAddress, senderPrivateKey, receiverAddress, amount);

                // Log a message to the console indicating a successful transaction
                console.log('Transaction successful! Transaction hash:', transactionResult.transactionHash);
            } catch (error) {
                console.error('Error sending transaction:', error.message);
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
});

async function sendTransaction(senderAddress, senderPrivateKey, receiverAddress, amount) {
    // Import Web3.js and XinFin network configuration
    const Web3 = require('web3');
    const { XinFin } = require('xinfin-tx');
    const web3 = new Web3(new XinFin('https://rpc.xinfin.network'));

    // Create a new account from the private key
    const account = web3.eth.accounts.privateKeyToAccount(senderPrivateKey);

    // Set the account as the default account
    web3.eth.defaultAccount = account.address;

    // Create a transaction object
    const transaction = {
        from: senderAddress,
        to: receiverAddress,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 21000,
        gasPrice: web3.utils.toWei('10', 'gwei')
    };

    // Sign and send the transaction
    const signedTransaction = await account.signTransaction(transaction);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    // Return the transaction hash
    return { transactionHash: receipt.transactionHash };
}