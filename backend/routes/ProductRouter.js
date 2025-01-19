//module
const ProductRouter = require("express").Router();

//Middlewares
const authValidator = require("../Middlewares/authValidator.js")

ProductRouter.get("/",authValidator,(req,res)=>{
    res.status(200)
    .json([
        {
            name:"Iphone",
            price:"3000"
        },
        {
            name:"Pixel",
            price:"40000"
        }
    ])
})

module.exports = ProductRouter