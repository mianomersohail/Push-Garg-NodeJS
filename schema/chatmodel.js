const mongoose = require('mongoose')

const ChatSchemas=new mongoose.Schema({
chatName:{type:String,trim :true},
isGrouped:{type:Boolean,default:false},
users:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}],
latestmessages:{type:mongoose.Schema.Types.ObjectId,ref:"Messages"},
isAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
},{timestamps:true})

const ChatsSchema=mongoose.model('ChatSchema',ChatSchemas)
module.exports=ChatsSchema