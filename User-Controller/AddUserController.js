const AdduserServices=require('../User-Services/AddUserServices')
const AddUserService= new AdduserServices()
class AddUserController{
    constructor(){
    }
   async AddUser(req,res){
    const {adduseremail,adduserpassword}=req.body;
    console.log(adduseremail,adduserpassword)
    console.log('req')
    try{
        const Result=await AddUserService.AddUser(adduseremail,adduserpassword);
        console.log(Result)
        if(Result.success==true){
           return res.status(200).json({message:Result.message,success:Result.success})
        }
       else{
            return res.status(400).json({message:Result.message,success:Result.success})
        }

    }catch(error){
        return res.status(500).json({errormessage:Result.errormessage,success:Result.success})
    }
    }
    async RemoveUser(req, res) {
        const { email } = req.body;
        try {
            const Result = await AddUserService.RemoveUser(email);
            console.log(Result)
    
            if (Result.success) {
                return res.status(200).json({ message: Result.message, success: true });
            } else {
                return res.status(400).json({ message: Result.message, success: false });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }
    
}
module.exports=AddUserController