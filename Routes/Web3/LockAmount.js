const express=require('express')
const router=express.Router()
const LockAmount = require('../../User-Controller/EthUserControl/LockAmount');
const UserConrol=new LockAmount();
router.post('/',async (req,res)=> await UserConrol.Lock(req,res))
module.exports=router;

