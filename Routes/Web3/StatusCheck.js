const express=require('express')
const router=express.Router()
const StatusCheck = require('../../User-Controller/EthUserControl/DealStatus');
const statuscheck=new StatusCheck();
router.post('/',async (req,res)=>  statuscheck.Status(req,res))
module.exports=router;

