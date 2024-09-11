const {LoginSchemas}=require('../schema/UserSchema')
const {SetUser}=require('../Auth/Authentication')
class UserServices{
    constructor(){
    }
    async login(email,password){
        try{
        const LoginResult=await LoginSchemas.findOne({email,password})
       if(LoginResult){
        const token=await SetUser(LoginResult)
        return {success:true,message:'Authorized',token}
       }
       else{
        return {success:false,message:'Un-Auhorized'}
       }
    }catch(error){
        return { success: false, message: error.message };
        console.log(error)
    }
}
}
module.exports=UserServices;