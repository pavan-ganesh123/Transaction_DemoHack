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
                // For demonstration purposes, let's assume the transaction is successful
                // You should replace this with actual code to send a transaction
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
    // Replace this with your actual code to send a transaction
    // For demonstration purposes, we're just returning a mock transaction result
    return { transactionHash: 'mockTransactionHash' };
}
