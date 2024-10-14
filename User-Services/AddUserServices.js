const { LoginSchemas } = require('../schema/UserSchema')
const { SignalModel } =require('../schema/SignalSchema')
class AddUserServices {
    constructor() { }
    
    async AddUser(adduseremail, adduserpassword,role,username,imagePath) {
        try {
            const Result = await new LoginSchemas({
                email: adduseremail,
                password: adduserpassword,
                role:role,
                username:username,
                image: imagePath,

            })
            const AfterSave = await Result.save();
            if (AfterSave) {
                return { success: true, message: 'User-Save-Successfully' }
            }
            else {
                return { success: false, message: 'User-Not-Save' }
            }
        } catch (error) {
            return { success: false, errormessage: error.message }
        }
    }
    // async RemoveUser(email) {
    //     try {
    //   const Result = await LoginSchemas.findOneAndDelete({email:email});
    //         if (!Result) {
    //             return { success: false, message: "User not found" };
    //         }
    //         return { success: true, message: "User deleted successfully" };
    //     } catch (error) {
    //         return { success: false, errormessage: error.message };       }
    //     }
    
    
    // Call RemoveUser with the exact email you want to delete
    async RemoveUser(req) {
        try {
            const email=req.body.removeinput
            // Attempt to find and delete the user in one step
            const Result = await LoginSchemas.findOneAndDelete({email:email});
            console.log(Result)
            if (!Result) {
                return { success: false, message: "User not found" };
            }
            
            return { success: true, message: "User deleted successfully" };
        } catch (error) {
            return { success: false, errormessage: error.message };
        }
    }
    
    
    async UpdateUser(req) {
        const { oldemail, newemail, oldpassword, newpassword, role } = req.body;
        try {
            // Find the user by the old email
            const user = await LoginSchemas.findOne({ email: oldemail });
            if (!user) {
                return { success: false, message: "User not Found" };
            }
    
            if (newemail) user.set({ email: newemail });
            if (newpassword) user.set({ password: newpassword });
            if (role) user.set({ role: role });
    
            await user.save();
    
            return { success: true, message: "User Updated Successfully" };
        } catch (error) {
            return { success: false, errormessage: error.message };
        }
    }
    
    
}
module.exports = AddUserServices;