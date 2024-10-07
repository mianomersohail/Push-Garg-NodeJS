const mongoose = require('mongoose')
const LoginSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: true
    },
    password: { type: String, required: true },
    role: { type: String, default: "User" },
    username: { type: String, default: "Jack" },
    image: { type: String }

})
const LoginSchemas = new mongoose.model('LoginSchemas', LoginSchema)
module.exports = {
    LoginSchemas: LoginSchemas
}