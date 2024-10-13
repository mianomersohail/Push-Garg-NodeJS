const express=require('express')
const routes=express.Router()


routes.post('/',function(req,res){
try{
console.log('req is coming ')
}catch(error){
    console.log(error)
    res.status(500).json(error)
}
})
module.exports=routes;