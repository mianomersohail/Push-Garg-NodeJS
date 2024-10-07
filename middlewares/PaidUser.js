const {GetUser}=require('../middlewares/AdminUser')
function PaidUserMiddleware(req,res,next){
    console.log('r')
    const authheader=req.headers['authorization']
    const token=authheader && authheader.split(' ')[1]
    console.log(token)
   try{
    if(!token){
        res.status(400).error('You are Logout')

    }
    const tokencheck=GetUser(token)
    if(!tokencheck){
        res.status(400).error("You are Logout")
    }
    next()
   }catch(error){
console.log(error)
   }
}
module.exports=PaidUserMiddleware;