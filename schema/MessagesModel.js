const mongoose=require('mongoose')

const MessagesSchema=new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"}
},{timestamps:true})

const MessagesSchemas=mongoose.model("MessagesSchemas",MessagesSchema)

module.exports=MessagesSchemas;