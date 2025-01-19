//external modules
const express = require("express")
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")

//core modules

//local modules

//-from Models
require("./Models/db.js")

//-from Routes
const AuthRouter = require("./routes/AuthRouter.js")
const ProductRouter = require("./routes/ProductRouter.js")

//creating app
const app = express();


//middleware
app.use("/",(req,res,next)=>{
    console.log(req.url,req.method,req.body);
    next();
})

//body parser
app.use(bodyParser.json())
app.use(cors())

//Routetings\

//if url is /auth than route its to AuthRouter
app.use("/auth",AuthRouter)
app.use("/product",ProductRouter)


//listening to requist at port 
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})