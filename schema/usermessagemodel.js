const mongoose = require('mongoose')

const UserMessageSchema = new mongoose.Schema({
   message:{type:String},
    role:{type:String,default:'User'},
    id:{type:mongoose.Schema.Types.ObjectId,ref:'LoginSchemas'},
    pic: {
        type: String, default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
}, { timestamps: true })

const UserMessageSchemas =new mongoose.model('UserMessageSchemas', UserMessageSchema)

module.exports = {
    UserMessageSchemas:UserMessageSchemas
}
