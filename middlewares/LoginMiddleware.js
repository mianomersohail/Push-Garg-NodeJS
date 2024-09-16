const {GetUser}=require('../Auth/Authentication')
async function LoginMiddleware(req,res,next){
    try{
        const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from 'Bearer token'
        
    console.log(token)
    if(!token){
        return next()
    }


    const checktoken=await GetUser(token)
    console.log(checktoken)
    if(!checktoken){
        return next()
    }
    if(checktoken.role=='Admin'){
        return res.status(200).json({message:"Authorized",role:checktoken.role})
    }
    
   return res.status(200).json({message:"Authorized",role:checktoken.role})
}catch(error){
    return res.status(500).send(error.message)
}
}
module.exports=LoginMiddleware;
