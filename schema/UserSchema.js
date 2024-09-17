

const mongoose=require('mongoose')
const LoginSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
          
    },
    value:{
        type:String
    },
    role:{
        type:String,
        default:"User"
    }
})

const LoginSchemas=new mongoose.model('LoginSchemas',LoginSchema)
module.exports={
    LoginSchemas:LoginSchemas
}