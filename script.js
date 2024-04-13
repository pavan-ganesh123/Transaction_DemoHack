document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Function to fetch and display wallet information
        const displayWalletInfo = async () => {
            try {
                const response = await fetch('/generateWallet');
                const { address, privateKey } = await response.json();
                document.getElementById('address').innerText = address;
                document.getElementById('privateKey').innerText = privateKey;

                // Check balance
                const balanceResponse = await fetch(`/checkBalance/${address}`);
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
            let amount = document.getElementById('amount').value;

            // Validate that amount is a positive number
            if (isNaN(amount) || parseFloat(amount) <= 0) {
                alert('Please enter a valid positive amount.');
                return;
            }

            try {
                const response = await fetch('/sendTransaction', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        senderAddress,
                        senderPrivateKey,
                        receiverAddress,
                        amount
                    })
                });

                const { message, receipt } = await response.json();
                document.getElementById('transactionStatus').innerText = message;
                document.getElementById('transactionHash').innerText = `Transaction Hash: ${receipt.transactionHash}`;
            } catch (error) {
                console.error('Error sending transaction:', error.message);
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
});
