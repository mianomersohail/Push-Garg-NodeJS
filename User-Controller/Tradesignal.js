const AddUserServices=require('../User-Services/TradeSignalServices')
const AddUserService = new AddUserServices()

class TradeSignal{
    constructor(){}
    async AddSignal(req,res){

        const userImage = req.file; 
        console.log(req.file)
        const {maindiscription,mainheading}=req.body;
        if (!userImage) {
            return res.status(400).json({ message: 'Image is required', success: false });
        }
        try {
            const Result = await AddUserService.AddSignal(maindiscription,mainheading , userImage.path // Save the file path to the database
            );
            console.log(Result)
            if (Result.success == true) {
                return res.status(200).json({ message: Result.message, success: Result.success })
            }
            else {
                return res.status(400).json({ message: Result.message, success: Result.success })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({errormessage:error })
        }
        

    }
        }
    

module.exports=TradeSignal