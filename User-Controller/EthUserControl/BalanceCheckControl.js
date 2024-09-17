// UserBalanceCheck.js
const EthBalanceCheckServices=require( '../../User-Services/EtherUserServices/EthBalanceCheckServices')
const EthConfig = require('../../EthConfig/EthConfig'); // Correct import

class UserBalanceCheck {
    constructor() {}

    async UserBalanceCheck(req, res) {
        try {
            const data = await EthConfig.contract.Balance(); // Access contract method directly
            const Data = data.toString(); // Convert to string
            console.log(Data)
            return res.status(200).send( Data );
        } catch (error) {
            console.error('Error reading balance:', error);
            return res.status(500).send({ error: 'Error reading balance' });
        }
    }
}

module.exports = UserBalanceCheck;
