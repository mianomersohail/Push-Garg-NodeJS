const express=require('express')
const router=express.Router()
const UserAgree = require('../../User-Controller/EthUserControl/User1Agree');
const UserConrol=new UserAgree();
router.post('/',async (req,res)=> await UserConrol.User1Agree(req,res))
module.exports=router;

