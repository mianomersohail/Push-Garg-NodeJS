const UserServices = require('../User-Services/UserServices')
const UserService = new UserServices()
class UserController {
    constructor() {
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const Result = await UserService.login(email, password);
            if (Result.success && Result.role == 'Admin') {
                const { message, role, username } = Result;
                return res.status(200).json({ message, role, token: Result.token, username: username,image:Result.image });
            }
            if (Result.success && Result.role == 'User') {
                setTimeout(() => {
                    return res.status(200).json({ message: Result.message, role: Result.role, token: Result.token, username: Result.username,image:Result.image })

                }, (3000));
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