const {LoginSchemas}=require('../schema/UserSchema')
class AddUserServices{
    constructor(){

    }
    async AddUser(adduseremail,adduserpassword,addusername,adduservalue){
        console.log('req services')
        try{
        const Result=await new LoginSchemas({ email: adduseremail,
            password: adduserpassword,
            username: addusername,
            value: adduservalue});
        console.log(Result)
        const AfterSave=await Result.save();
        console.log(AfterSave)
        if(AfterSave){
            return {success:true,message:'User-Save-Successfully'}
        }
        else{
            return {success:false,message:'User-Not-Save'}
        }
    }catch(error){
        return {success:false,errormessage:error.message}
    }

    }
}
module.exports=AddUserServices;