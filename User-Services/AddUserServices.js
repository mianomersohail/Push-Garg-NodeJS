const { LoginSchemas } = require('../schema/UserSchema')
class AddUserServices {
    constructor() { }
    async AddUser(adduseremail, adduserpassword,username) {
        console.log(adduseremail, adduserpassword)
        try {
            const Result = await new LoginSchemas({
                email: adduseremail,
                password: adduserpassword,
                username:username
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
            const user = await LoginSchemas.findOne({ email: oldemail, password: oldpassword });
            if (!user) {
                return { success: false, message: "User not Found" }
            }
            user.email = newemail || user.email;
            user.password = newpassword || user.password;
            user.role = role || user.role;
            await user.save()
            return { success: true, message: "User Update SUccessfully" }
        } catch (error) {
            return { success: false, errormessage: error.message }
     }
    }
}
module.exports = AddUserServices;