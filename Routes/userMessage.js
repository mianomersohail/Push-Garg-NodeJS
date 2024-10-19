const express=require('express')
const routes=express.Router()
const {UserMessageSchemas}=require('../schema/usermessagemodel')
routes.get('/',async function(req,res){
    try{
    const messages = await UserMessageSchemas.find({}).sort({ createdAt: 1 });
    console.log(messages)
    if(messages){
       return res.status(200).send(messages)

    }
    console.log(message)
    res.status(404).json("Message not found")

}catch(error){
    console.log(error)
    res.status(500).json(error)
}
})
module.exports=routes;