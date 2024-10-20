require('dotenv').config();
const jwt = require('jsonwebtoken');

// Ensure the secret key is coming from .env
const secret = process.env.SECRET;
function SetUser(user) {
    try{
    const UserData = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
        image:user.image
    };
    return jwt.sign(UserData, secret, { expiresIn: '30d' });
}catch(error){
    return error
}
}

async function GetUser(token) {
    if (!token) return null;
    try {
        return await jwt.verify(token, secret); // Use 'secret' instead of 'secrets'
    } catch (error) {
        console.error("Invalid or expired token:", error.message);
        return null;
    }
}

module.exports = {
    GetUser: GetUser,
    SetUser: SetUser,
};
