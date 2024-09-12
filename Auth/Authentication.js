const jwt=require("jsonwebtoken")
const crypto = require('crypto');
function generateSecret() {
    return crypto.randomBytes(32).toString('hex');
}

const secret = generateSecret(); 
function SetUser(user){
    const UserData={
        email:user.email,
        id:user.id
    }
    return jwt.sign(UserData, secret, { expiresIn: '2h' });

}
async function GetUser(token){
    if(!token)return(null)
        try {
            return await  jwt.verify(token, secret);
        } catch (error) {
            console.error("Invalid or expired token:", error.message);
              console.log(error)
            return null;
        }
}
module.exports={
    GetUser:GetUser,
    SetUser:SetUser
}
