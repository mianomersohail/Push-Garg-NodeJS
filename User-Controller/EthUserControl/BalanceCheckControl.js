const { ethers } = require('ethers'); // Import ethers.js
const EthConfig = require('../../EthConfig/EthConfig'); // Correct import

class UserBalanceCheck {
    constructor() {}

    async UserBalanceCheck(req, res) {
        try {
            console.log(req.body)
            console.log('Request received');
            const { Data } = req.body; // Extract user address from request body
            console.log(Data)

            // Get the contract instance with the correct signer
            const contract = EthConfig.getContractInstance(); // Adjust if needed

            // Call the contract's Balances function
            const data = await contract.Balances(Data); // Call without 'from' option

            // Log the raw data from the contract
            console.log('Raw data from contract:', data);

            // Check if the returned data is a BigNumber
            if (!ethers.BigNumber.isBigNumber(data)) {
                throw new Error('Invalid balance data received from the contract');
            }

            // Convert the balance from Wei to Ether
            const amountInEther = ethers.utils.formatEther(data); // Use ethers to format

            // Log the Ether balance
            console.log('Ether balance:', amountInEther);
            
            // Send the Ether balance as a response
            return res.status(200).send({ balance: amountInEther });
        } catch (error) {
            console.error('Error reading balance:', error);
            return res.status(500).send({ error: 'Error reading balance' });
        }
    }
}

module.exports = UserBalanceCheck;
