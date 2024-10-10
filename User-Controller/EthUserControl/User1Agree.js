const EthConfig = require('../../EthConfig/EthConfig');
class UserAgree {
    constructor() { }
    async User1Agree(req, res) {
        const { Id, Datas } = req.body;
        console.log(req.body)
        // console.log('Data:', Data, 'Datas:', Datas);
        try {
            const dealData = await EthConfig.contract.User2Agree(Id, {
                from: Datas
            });

            // console.log('Transaction hash:', dealData.hash);
            const receipt = await dealData.wait();
            // console.log('Transaction receipt:', receipt);

            res.status(200).send({ message: receipt });
        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ errormessage: error.message });
        }
    }
}

module.exports = UserAgree;
