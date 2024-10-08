const AddUserServices=require('../User-Services/AddUserServices')
const AddUserService = new AddUserServices()

class TradeSignal{
    constructor(){}
    async AddSignal(req,res){


        const userImage = req.file; 
        
        console.log(req.body)
        if (!userImage) {
            return res.status(400).json({ message: 'Image is required', success: false });
        }
        try {
            const Result = await AddUserService.AddUser(maindiscription,mainheading , username, userImage.path // Save the file path to the database
            );
            console.log(Result)
            if (Result.success == true) {
                return res.status(200).json({ message: Result.message, success: Result.success })
            }
            else {
                return res.status(400).json({ message: Result.message, success: Result.success })
            }
        } catch (error) {
            return res.status(500).json({errormessage:error })
        }
        

    }
        }
    

module.exports=TradeSignal