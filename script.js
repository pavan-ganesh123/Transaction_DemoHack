document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Function to fetch and display wallet information
        const displayWalletInfo = async () => {
            try {
                const response = await fetch('/generateWallet', {
                    method: 'GET' // Correct method to send a GET request
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch wallet information: ${response.status} ${response.statusText}`);
                }
                const { address, privateKey } = await response.json();
                document.getElementById('address').innerText = address;
                document.getElementById('privateKey').innerText = privateKey;

                // Check balance
                const balanceResponse = await fetch(`/checkBalance/${address}`);
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
            // Add code to send transaction
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
});
