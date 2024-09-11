require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const path=require('path')
const cookieparser=require('cookie-parser')
const port=process.env.PORT || 3002
const MondoDb=require('./config/MongoDb-Connection')
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieparser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//MONDO DB CONNECTION 
const Mongo=new MondoDb();
if(Mongo.testconnection()!=1){
    Mongo.connect()
}
//ALL ROUTES ARE HERE
const Login=require('./Routes/Login')
app.use('/Login',Login)
app.listen(port,()=>{
    console.log(`Your App is Running on Port ${port}`)

})