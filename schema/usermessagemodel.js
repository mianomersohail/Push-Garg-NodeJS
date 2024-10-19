const mongoose = require('mongoose')

const UserMessageSchema = new mongoose.Schema({
   message:{type:String},
    role:{type:String,default:'User'},
    createdAt: { type: Date, default: Date.now },
    id:{type:String},
    pic: {
        type: String, default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
},{ timestamps: { createdAt: 'createdAt'} })
UserMessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const UserMessageSchemas =new mongoose.model('UserMessageSchemas', UserMessageSchema)

module.exports = {
    UserMessageSchemas:UserMessageSchemas
}
