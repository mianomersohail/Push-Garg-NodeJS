const {LoginSchemas}=require('../schema/UserSchema')
const {SetUser}=require('../Auth/Authentication')
class UserServices{
    constructor(){}
    async login(email,password){
        try{
        const LoginResult=await LoginSchemas.findOne({email:email,password:password})
       if(LoginResult && LoginResult.role=='Admin'){
        const token=await SetUser(LoginResult)
        return {success:true,message:'Authorized',token,role:"Admin",username:LoginResult.username,image: LoginResult.image,userId:LoginResult._id  }
       }
       if(LoginResult && LoginResult.role=='User'){
        const token=await SetUser(LoginResult)
        return {success:true,message:'Authorized',token,role:"User",username:LoginResult.username,image: LoginResult.image,userId:LoginResult._id   }
       }
       else{
        return {success:false,message:'Un-Auhorized'}
       }
    }catch(error){
        return { success: false, message: error.message };
    }
}
}
module.exports=UserServices;