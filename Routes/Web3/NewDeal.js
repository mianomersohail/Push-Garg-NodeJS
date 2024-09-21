const express=require('express')
const router=express.Router()
const NewDealController = require('../../User-Controller/EthUserControl/NewDealAdd');
const UserConrol=new NewDealController();
router.post('/',async (req,res)=> await UserConrol.NewDeal(req,res))
module.exports=router;

