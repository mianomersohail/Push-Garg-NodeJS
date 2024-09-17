const express=require('express')
const router=express.Router()
const UserController=require('../User-Controller/UserController')
const UserConrol=new UserController()
router.post('/',(req,res)=>UserConrol.login(req,res))
router.get('/',(req,res)=>UserConrol.login(req,res))
module.exports=router;
