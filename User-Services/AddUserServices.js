const {LoginSchemas}=require('../schema/UserSchema')
class AddUserServices{
    constructor(){    }
    async AddUser(adduseremail,adduserpassword,addusername,adduservalue){
        try{
        const Result=await new LoginSchemas({ email: adduseremail,
            password: adduserpassword,
            username: addusername,
            value: adduservalue})
        const AfterSave=await Result.save();
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
    async RemoveUser(email) {
        try {
            // Attempt to find and delete the user by email
            const Result = await LoginSchemas.findOneAndDelete( email );
    
            // Check if the Result is null (i.e., no user found with that email)
            if (!Result) {
                return { success: false, message: "User not found" }; // Send appropriate error message
            }
    
            // If the user was found and deleted, return success message
            return { success: true, message: "User deleted successfully" };
        } catch (error) {
            // Catch any potential errors and return a failure response
            return { success: false, errormessage: error.message };
        }
    }
}
module.exports=AddUserServices;