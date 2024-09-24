const EthConfig = require('../../EthConfig/EthConfig');

class UserAgree {
    constructor() { }

    async User1Agree(req, res) {
        const { Data ,Datas} = req.body;  // Data: dealId, Datas: user address
        console.log('Data:', Data, 'Datas:', Datas);

        try {
            const dealData = await EthConfig.contract.User2Agree(Data, {
                from: Datas
            });

            
            // Log transaction hash
            console.log('Transaction hash:', dealData.hash);

            // Wait for the transaction to be mined
            const receipt = await dealData.wait();


            // Log receipt details
            console.log('Transaction receipt:', receipt);

            // Respond with the receipt
            res.status(200).send({ message: receipt });
        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ errormessage: error.message });
        }
    }
}

module.exports = UserAgree;
