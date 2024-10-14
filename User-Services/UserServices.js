const { LoginSchemas } = require('../schema/UserSchema');
const { SetUser } = require('../Auth/Authentication');
const bcrypt = require('bcrypt');

class UserServices {
    constructor() {}

    async login(email, password) {
        try {
            // Find the user by email
            const LoginResult = await LoginSchemas.findOne({ email: email });

            // Check if the user exists
            if (!LoginResult) {
                return { success: false, message: 'User not found' };
            }

            // Compare the entered password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, LoginResult.password);
            if (!isMatch) {
                return { success: false, message: 'Invalid password' };
            }

            // User is authenticated, generate a token
            const token = await SetUser(LoginResult);

            // Return user details based on their role
            return {
                success: true,
                message: 'Authorized',
                token,
                role: LoginResult.role,
                username: LoginResult.username,
                image: LoginResult.image,
                userId: LoginResult._id
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = UserServices;
