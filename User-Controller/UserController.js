const UserServices = require('../User-Services/UserServices')
const UserService = new UserServices()
class UserController {
    constructor() {
    }
    async login(req, res) {
        try {
            console.log("Hello")
            const { email, password } = req.body;
            console.log(email, password)
            const Result = await UserService.login(email, password);
            console.log(Result)
            if (Result.success && Result.role == 'Admin') {
                const { message, role, username } = Result;
                console.log(Result)
                // res.cookie('token', token, {
                //     httpOnly: true, // Prevent client-side JS from accessing the token
                //     secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                //     maxAge: 3600000 // 1 hour in milliseconds
                // });

                // Return the user data and a success message

                return res.status(200).json({ message, role, token: Result.token, username: username });

            }
            if (Result.success && Result.role == 'User') {
                // res.cookie('token', Result.token, {
                //     httpOnly: true, // Prevent client-side JS from accessing the token
                //     secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                //     maxAge: 3600000 // 1 hour in milliseconds
                // });
                setTimeout(() => {
                    return res.status(200).json({ message: Result.message, role: Result.role, token: Result.token, username: Result.username })


                }, (6000));

            }
            else {
                return res.status(400).json({ message: Result.message })
            }
        } catch (error) {
            res.status(500).json({ errormessage: error.message })
            console.log(error)

        }
    }
}

module.exports = UserController;