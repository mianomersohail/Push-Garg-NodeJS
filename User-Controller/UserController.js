const UserServices=require('../User-Services/UserServices')
const UserService=new UserServices()
class UserController{
    constructor(){
    }
    async login(req,res){
        try{
        const{email,password}=req.body;
        const Result=await UserService.login(email,password);
        if(Result.success){
            const {token,message}=Result;
            res.cookie('token', token, {
                httpOnly: true,  // Prevent client-side JS from accessing the token
                 // Use secure cookies in production
                maxAge: 3600000 // 1 hour in milliseconds
            });
    
            // Return the user data and a success message
            return res.status(200).json({ message });
        }
        else{
            return res.status(400).json({message:Result.message})
        }
    }catch(error){
        res.status(500).json({errormessage:error.message})
        console.log(error)

    }
    }
}

module.exports=UserController;