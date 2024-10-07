const { error } = require('console');
const EthConfig=require('../../EthConfig/EthConfig')
class CheckLockamount{
    constructor(){}
async Lock(req, res) {
    const { Data, CheckLockamount} = req.body;
    console.log(req.body)
    try {
        if(CheckLockamount == ''){
            const dealData = await EthConfig.contract.LockAmount(Data); // Fetch deal data
            console.log('Deal data from contract:', dealData); // Log dealData
            const Result=dealData.toString()
           return res.status(200).json({amount: Result})
            // if (dealData && dealData != '0') {
            //     const dealIdString = dealData.toString();
            //     return res.status(200).json({ amount: dealIdString });
            // } else {
            //     console.log('Received invalid or zero amount');
            //     return res.status(200).json({ amount: '0' }); // Return '0' if no deal data found
            // }

        }
        else{
            const dealData = await EthConfig.contract.LockAmount(CheckLockamount); // Fetch deal data
            console.log('Deal data from contract:', dealData); // Log dealData
            const Result=dealData.toString()
           return res.status(200).json({amount: Result})
            // if (dealData && dealData != '0') {
            //     const dealIdString = dealData.toString();
            //     return res.status(200).json({ amount: dealIdString });
            // } else {
            //     console.log('Received invalid or zero amount');
            //     return res.status(200).json({ amount: '0' }); // Return '0' if no deal data found
            // }
        }
        const dealData = await EthConfig.contract.LockAmount(Data); // Fetch deal data
        console.log('Deal data from contract:', dealData); // Log dealData
        const Result=dealData.toString()
       return res.status(200).json(Result)
        // if (dealData && dealData != '0') {
        //     const dealIdString = dealData.toString();
        //     return res.status(200).json({ amount: dealIdString });
        // } else {
        //     console.log('Received invalid or zero amount');
        //     return res.status(200).json({ amount: '0' }); // Return '0' if no deal data found
        // }
    } catch (error) {
        console.log(error)
        res.status(500).json({ errormessage: error });
    }
}
}
module.exports=CheckLockamount;