const EthConfig=require('../../EthConfig/EthConfig')
class NewDealController {
    constructor() {}
    async NewDeal(req, res) {
        try {
            console.log('Request received');
            const { DealAmount, DealAddress1, DealAddress2 } = req.body;

            // Ensure DealAddress1 and DealAddress2 are valid Ethereum addresses
            // if (!ethers.utils.isAddress(DealAddress1) || !ethers.utils.isAddress(DealAddress2)) {
            //     throw new Error('Invalid Ethereum address');
            // }

            // Call the contract's NewDeal function
            const tx = await EthConfig.contract.NewDeal(DealAmount, DealAddress1, DealAddress2);

            // Check if tx is defined and is a promise
            // if (!tx || typeof tx.wait !== 'function') {
            //     throw new Error('Transaction object is not valid');
            // }

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            // Log the transaction receipt
            // Send the transaction receipt as a response
            return res.status(200).send(receipt);
        } catch (error) {
            
            return res.status(500).send({ error: 'Error adding new deal' });
        }
    }
}
module.exports=NewDealController;