const EthConfig = require('../../EthConfig/EthConfig');

class NewDealController {
    constructor() {}
    async NewDeal(req, res) {
        try {
            console.log('Request received');
            const { DealAmount, DealAddress1, DealAddress2 } = req.body;
            console.log(DealAddress1,DealAddress2,DealAmount)
            console.log(req.body)

            // Validate if addresses are the same
            if (DealAddress1 === DealAddress2) {
                console.log('Error: Addresses are identical.');
                return res.status(400).json({ errormessage: "Both addresses cannot be the same." });
            }
            // Validate DealAmount (e.g., check if it's a positive number)
            if (!DealAmount || DealAmount <= 0) {
                return res.status(400).json({ errormessage: "Deal amount must be a positive value." });
            }
          // Call the contract's NewDeal function
            const tx = await EthConfig.contract.NewDeal(DealAmount, DealAddress1, DealAddress2);
            // Wait for the transaction to be mined
            const receipt = await tx.wait();
            if(receipt.error){
                console.log(MediaError)
            }
            console.log('Transaction receipt:', receipt);
            // Send the transaction receipt as a response
            return res.status(200).json({message:"DealAdd",receipt});
        } catch (error) {
            console.error('Error during NewDeal transaction:', error.message);
            return res.status(500).json({ error: 'Error adding new deal', details: error.message });
        }
    }
}

module.exports = NewDealController;
