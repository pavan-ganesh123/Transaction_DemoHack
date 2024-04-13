const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Route handler for generating wallet information
app.get('/generateWallet', (req, res) => {
    try {
        // Logic to generate wallet information (address and private key)
        const wallet = generateWallet(); // Implement this function to generate wallet info

        // Construct JSON response object
        const walletInfo = {
            address: wallet.address,
            privateKey: wallet.privateKey
        };

        // Send JSON response
        res.json(walletInfo);
    } catch (error) {
        // Handle errors
        console.error('Error generating wallet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to generate wallet information (placeholder)
function generateWallet() {
    // Implement logic to generate wallet information here
    // For example, you can use libraries like ethereumjs-wallet to create a new wallet
    // For simplicity, let's create a dummy wallet
    const address = '0x123abc...';
    const privateKey = 'abcdef123456...';
    return { address, privateKey };
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
