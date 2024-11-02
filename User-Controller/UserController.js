const UserServices = require('../User-Services/UserServices')
const crypto=require('crypto')
const UserService = new UserServices()
class UserController {
    constructor() {
    }
    async login(req, res) {
        try {
            
            const { email, password } = req.body;
            console.log(email,password)
            const Result = await UserService.login(email, password);
            if (Result.success && Result.role == 'Admin') {

                return res.status(200).json({Result})
            }
            if (Result.success && Result.role == 'User') {
                    return res.status(200).json({Result})
            }
            else {
                return res.status(400).json({ message: Result.message })
            }
        } catch (error) {
            res.status(500).json({ errormessage: error.message })
        }
    }
}

module.exports = UserController;