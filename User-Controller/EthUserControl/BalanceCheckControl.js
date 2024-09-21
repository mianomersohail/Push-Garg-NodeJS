const ethers = require('ethers'); // Import ethers.js
const EthBalanceCheckServices = require('../../User-Services/EtherUserServices/EthBalanceCheckServices');
const EthConfig = require('../../EthConfig/EthConfig'); // Correct import

class UserBalanceCheck {
    constructor() {}

    async UserBalanceCheck(req, res) {
        try {
            console.log('Request received');
            // Call the contract's Balances function
            const data = await EthConfig.contract.Balances();
            // Log the raw data from the contract
            console.log('Raw data from contract:', data);

            // Check if the returned data is valid
            if (typeof data !== 'bigint') {
                throw new Error('Invalid balance data received from the contract');
            }

            // Convert the balance from Wei to Ether
            const amountInEther = Number(data) / 1e18; // Convert BigInt to Number for division

            // Format the Ether balance to avoid scientific notation
            const EthBalance = amountInEther.toFixed(18); // Adjust the number of decimals as needed

            // Log the Ether balance
            console.log('Ether balance:', EthBalance);
            
            // Send the Ether balance as a response
            return res.status(200).send(EthBalance);
        } catch (error) {
            console.error('Error reading balance:', error.message);
            return res.status(500).send({ error: 'Error reading balance' });
        }
    }
}

module.exports = UserBalanceCheck;
