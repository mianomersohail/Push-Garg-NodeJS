const AdduserServices = require('../User-Services/AddUserServices')
const AddUserService = new AdduserServices()
class AddUserController {
    constructor() { }
    async AddUser(req, res) {
        console.log(req.body)
        const { adduseremail, adduserpassword, username } = req.body;
        const userImage = req.file; // Get the uploaded file

        if (!userImage) {
            return res.status(400).json({ message: 'Image is required', success: false });
        }
        console.log('req')
        try {
            const Result = await AddUserService.AddUser(adduseremail, adduserpassword, username, userImage.path // Save the file path to the database
            );
            console.log(Result)
            if (Result.success == true) {
                return res.status(200).json({ message: Result.message, success: Result.success })
            }
            else {
                return res.status(400).json({ message: Result.message, success: Result.success })
            }
        } catch (error) {
            return res.status(500).json({ errormessage: Result.errormessage, success: Result.success })
        }
    }
    async RemoveUser(req, res) {
        try {
            const Result = await AddUserService.RemoveUser(req);
            if (Result.success) {
                return res.status(200).json({ message: Result.message, success: true });
            } else {
                return res.status(400).json({ message: Result.message, success: false });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }
    async UpdateUser(req, res) {
        const { oldemail, newemail, oldpassword, newpassword, role } = req.body;
        console.log(req.body)
        try {
            if (!oldemail || !oldpassword || !newemail || !newpassword || !role) {
                return res.status(400).json({ message: 'Old Information is Required' })
            }
            const Result = await AddUserService.UpdateUser(req, res)
            console.log(Result)
            if (Result.message == 'User Update SUccessfully') {
                return res.status(200).json({ success: true, message: "User Update Successfully" })
            }
            else {
                return res.status(400).json({ success: false, message: "Try Again User Not Save Check your Email or Password" })
            }

        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })
        }
    }
}
module.exports = AddUserController