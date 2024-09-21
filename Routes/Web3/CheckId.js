const express=require('express')
const router=express.Router()
const DEALS = require('../../User-Controller/EthUserControl/CheckId');
const UserConrol=new DEALS();
router.get('/',async (req,res)=> UserConrol.DealId(req,res));


module.exports=router;