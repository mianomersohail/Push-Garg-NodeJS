const express=require('express')
const router=express.Router()
const EthBalanceCheckControl = require('../../User-Controller/EthUserControl/BalanceCheckControl');
const UserConrol=new EthBalanceCheckControl();
router.get('/',async (req,res)=> UserConrol.UserBalanceCheck(req,res))


module.exports=router;