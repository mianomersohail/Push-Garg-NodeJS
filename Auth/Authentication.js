const jwt=require("jsonwebtoken")
const crypto = require('crypto');
function generateSecret() {
    return crypto.randomBytes(32).toString('hex');
}

const secret = generateSecret();
const secrets='umersohail'
function SetUser(user){
    const UserData={
        email:user.email,
        id:user.id,
        role:user.role,
        username:user.username
    }
    return jwt.sign(UserData, secrets);
}
async function GetUser(token){
    if(!token)return(null)
        try {
            return await  jwt.verify(token, secrets);
        } catch (error) {
            console.error("Invalid or expired token:", error.message);
            return null;
        }
}
module.exports={
    GetUser:GetUser,
    SetUser:SetUser
}
