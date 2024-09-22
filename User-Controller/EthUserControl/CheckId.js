const EthConfig = require('../../EthConfig/EthConfig');

class DealId {
    constructor() {}

    async DealId(req, res) {
        try {
            // Fetch the deal ID from the contract (likely a BigInt)
            const Data = await EthConfig.contract.nextDealId();
            
            // Check if the data is received
            if (Data) {
                console.log('Deal ID (BigInt):', Data);
                
                // Convert BigInt to string before sending in JSON
                const Id = Data.toString();
                
                // Send the stringified deal ID as JSON
                return res.status(200).json({  Id });
            }
        } catch (error) {
            console.error('Error fetching deal ID:', error);
            return res.status(500).send(error.message);
        }
    }
}

module.exports = DealId;
