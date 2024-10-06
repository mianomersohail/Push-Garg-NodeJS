const express=require('express')
const router=express.Router()
const AddUserController=require('../User-Controller/AddUserController')
const AddUserControllers=new AddUserController()
router.post('/',(req,res)=>AddUserControllers.AddUser(req,res))
router.delete('/',(req,res)=>AddUserControllers.RemoveUser(req,res))
router.put('/',(req,res)=>AddUserControllers.UpdateUser(req,res))
module.exports=router
