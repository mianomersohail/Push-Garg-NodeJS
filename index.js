require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const path=require('path')
const cookieparser=require('cookie-parser')
const port=process.env.PORT || 3002
const MondoDb=require('./config/MongoDb-Connection')
app.use(cors())
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true // Allow credentials to be included
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//MONDO DB CONNECTION 
const Mongo=new MondoDb();
if(Mongo.testconnection()!=1){
    Mongo.connect()
}
//All Middle wares are imported Here
const AddRemoveMiddleware=require('./middlewares/Addremove')
const LoginMiddleware=require('./middlewares/LoginMiddleware')
app.use(['/NewUser','/RemoveUser'],AddRemoveMiddleware)
//ALL ROUTES ARE HERE
const Login=require('./Routes/Login')
const NavLogin=require('./Routes/NavLogin')
const AddUser=require('./Routes/NewUser')
const Cv=require('./Routes/CvDownload')
const RemoveUser=require('./Routes/NewUser')
app.use('/Login',Login)
app.use('/NavLogin',NavLogin)
app.use('/NewUser',AddUser)
app.use('/Cv',Cv)

app.use('/RemoveUser',RemoveUser)
//Routes for Ethers 
const EthBalanceCheck=require('../node-js/Routes/Web3/Balance')
const NewDeal=require('./Routes/Web3/NewDeal')
const ID=require('./Routes/Web3/CheckId')
const Status=require('./Routes/Web3/StatusCheck')
const LockAmount=require('./Routes/Web3/LockAmount')
const User1Agree=require('./Routes/Web3/User1Agree')
app.use('/EthBalanceCheck',EthBalanceCheck)
app.use("/NewDeal",NewDeal)
app.use('/DEALS',ID)
app.use("/Status",Status)
app.use('/LockAmount',LockAmount)
app.use('/User1Agree',User1Agree)
app.listen(port,()=>{
    
    console.log(`Your App is Running on Port ${port}`)

})