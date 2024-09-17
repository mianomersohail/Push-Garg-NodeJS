const AdduserServices=require('../User-Services/AddUserServices')
const AddUserService= new AdduserServices()
class AddUserController{
    constructor(){

    }
   async AddUser(req,res){

    const {adduseremail,adduserpassword,addusername,adduservalue}=req.body;
    console.log('req')
    try{
        const Result=await AddUserService.AddUser(adduseremail,adduserpassword,addusername,adduservalue);
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
}
module.exports=AddUserController