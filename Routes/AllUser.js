const express=require('express')
const routes=express.Router()
const {LoginSchemas}=require('../schema/UserSchema')
routes.get('/',async function(req,res){ 
    try{
        const Result=await LoginSchemas.find()
        if(Result){
                res.status(200).json(Result)
        }
        else{
            res.status(400).json('User-Not-Found')
        }
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
module.exports=routes;