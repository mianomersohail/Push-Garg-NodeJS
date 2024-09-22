const EthConfig=require('../../EthConfig/EthConfig')
class CheckLockamount{
    constructor(){}

async Lock(req, res) {
    const { Data } = req.body;
    try {
        const dealData = await EthConfig.contract.LockAmount(Data); // Fetch deal data
        console.log('Deal data from contract:', dealData); // Log dealData

        if (dealData && dealData != '0') {
            const dealIdString = dealData.toString();
            return res.status(200).json({ amount: dealIdString });
        } else {
            console.log('Received invalid or zero amount');
            return res.status(200).json({ amount: '0' }); // Return '0' if no deal data found
        }
    } catch (error) {
        res.status(500).json({ errormessage: error.message });
    }
}
}
module.exports=CheckLockamount;