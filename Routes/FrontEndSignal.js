const express=require('express')
const router=express.Router()
const {SignalModel}=require('../schema/SignalSchema')
router.post('/',async function(req,res){
    try{
        const Result=await SignalModel.find();
        console.log(Result)
        if(Result){
            res.status(200).json(Result)
        }
        else{
            res.status(400).json({message:"Result not Fount"})
        }

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }

})
module.exports=router;