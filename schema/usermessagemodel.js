const mongoose = require('mongoose')

const UserMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
        type: String, required: true, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
}, { timestamps: true })

const UserMessageSchemas = mongoose.model('UserMessageSchemas', UserMessageSchema)

module.exports = UserMessageSchemas;