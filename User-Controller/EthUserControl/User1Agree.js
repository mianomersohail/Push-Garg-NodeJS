const EthConfig=require('../../EthConfig/EthConfig')
class UserAgree{
    constructor(){    }
    async User1Agree(req,res){
    
        const { Data,Datas } = req.body;
        console.log(Data,Datas)
        try {
            const dealData = await EthConfig.contract.User1Agree(Data); // Fetch deal data
            console.log('Deal data from contract:', dealData); // Log dealData
            
            
        } catch (error) {
            res.status(500).json({ errormessage: error.message });
        }

    }
}
module.exports=UserAgree;