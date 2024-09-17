const express=require('express')
const router=express.Router()
const AddUserController=require('../User-Controller/AddUserController')
const AddUserControllers=new AddUserController()
router.post('/',(req,res)=>AddUserControllers.AddUser(req,res))

module.exports=router