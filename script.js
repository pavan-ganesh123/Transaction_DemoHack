document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Function to fetch and display wallet information
      const displayWalletInfo = async () => {
        const response = await fetch('/generateWallet');
        const { address, privateKey } = await response.json();
        document.getElementById('address').innerText = address;
        document.getElementById('privateKey').innerText = privateKey;
        
        // Check balance
        const balanceResponse = await fetch(`/checkBalance/${address}`);
        const { balance } = await balanceResponse.json();
        document.getElementById('balance').innerText = balance;
      };
  
      // Display wallet information when the page loads
      await displayWalletInfo();
  
      // Add event listener for "Generate Wallet" button
      const generateWalletBtn = document.getElementById('generateWalletBtn');
      generateWalletBtn.addEventListener('click', displayWalletInfo);
    } catch (error) {
      console.error('Error:', error.message);
    }
    
    // Send transaction
    document.getElementById('sendTransactionBtn').addEventListener('click', async () => {
      const senderAddress = document.getElementById('senderAddress').value;
      const senderPrivateKey = document.getElementById('senderPrivateKey').value;
      const receiverAddress = document.getElementById('receiverAddress').value;
      const amount = document.getElementById('amount').value;
      
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
        console.error('Error:', error.message);
      }
    });
  });
