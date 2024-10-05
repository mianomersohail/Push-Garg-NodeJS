require('dotenv').config()
const mongoose=require('mongoose')
class MongodbConnection{
    constructor(){

    }
    testconnection(){
      return  mongoose.connection.readyState
    }
    connect(){
        const string=process.env.MONGO_URL;
        mongoose.connect(string,{
          dbname:"Umer"
        }).then(function(){
          console.log('MondoDb Connected Successfully ')
        }).catch(function(error){
          console.log(error.message)
        })
    }
}
module.exports=MongodbConnection;