require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const path=require('path')
const cookieparser=require('cookie-parser')
const port=process.env.PORT || 3002
const MondoDb=require('./config/MongoDb-Connection')
app.use(cors())
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
const LoginMiddleware=require('./middlewares/LoginMiddleware')
app.use('/Login',LoginMiddleware)
//ALL ROUTES ARE HERE
const Login=require('./Routes/Login')
app.use('/Login',Login)
app.listen(port,()=>{
    console.log(`Your App is Running on Port ${port}`)

})