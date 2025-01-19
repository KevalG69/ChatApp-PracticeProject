//modules
const mongoose = require("mongoose");

//connection string from .env
const MONGO_URL = process.env.MONGO_CONNECTION_URL;

//connecting mongoose using connect function 
mongoose.connect(MONGO_URL,{dbName:"ChatApp-db"}).then(()=>{
    console.log("Connection Successfull")
}).catch((error)=>{
    console.log("Connection error:",error)
})

