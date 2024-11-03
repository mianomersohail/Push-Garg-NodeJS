const express=require('express')
const router=express.Router()
const {SignalModel}=require('../schema/SignalSchema')
router.post('/',async function(req,res){
    try{
        console.log("signalss")
        const Result=await SignalModel.find();        
         if(Result){

                res.status(200).json(Result)
          

            
            
           
        }         

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }

})
module.exports=router;