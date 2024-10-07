const { ethers } = require('ethers'); // Import ethers.js
const EthConfig = require('../../EthConfig/EthConfig');
class UserBalanceCheck {
    constructor() {}
    async UserBalanceCheck(req, res) {
        try {
            console.log(req.body);
            console.log('Request received');
            const { Data } = req.body; 
            // Fetch the balances using EthConfig contract
            const tx = await EthConfig.contract.Balances();
            console.log(tx);
            // Convert any BigInt values to strings
            const txSerialized = JSON.parse(JSON.stringify(tx, (key, value) => 
                typeof value === 'bigint' ? value.toString() : value
            ));
            // Return the serialized result
            return res.status(200).json({ tx: txSerialized });
        } catch (error) {
            console.error('Error reading balance:', error);
            return res.status(500).send({ error: 'Error reading balance' });
        }
    }
}
module.exports = UserBalanceCheck;
