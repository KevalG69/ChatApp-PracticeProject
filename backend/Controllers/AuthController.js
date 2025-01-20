//modules
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//model
const UserModel = require("../Models/User.js")


//singup controller 
const singUp = async (req,res)=>{
    //try and catch if there is error in run time
    try
    {
        //extracting data from req.body
        const {name,email,password} = req.body;
        console.log("req.body",req.body)
        //checking if email already exist in database
        const user = await UserModel.findOne({email});
   
        //if user exist in database then there is no need to create User
        if(user)
        {
            return res.status(404)
                .json({message:"Email already Exist",
                        success:false
                })
        }

        //if email not exist in database then crate new user with email

        //1. create user data schema using usermodel
        const userModel = new UserModel({name,email,password})

        
        //2.bcrypting the password 

        userModel.password = await bcrypt.hash(password,10)
       

        //3.saving user details to database
        await userModel.save();

        //seding response with status code 201
        res.status(201)
            .json({
                message:"singUp Successfull",
                success:true
            })
        

    }
    catch(error)
    {
        //seding response with stauc code 500 do to internal error
        res.status(500)
        .json({
            message:"singUp -Server Error",
            success:false,error
        })
    

    }
    




}

//singin controller
const singIn = async (req,res)=>{
    try
    {   
        //extracting data from req.body
        const {email,password} = req.body

        //checking if there is email already exist in database
        const user = await UserModel.findOne({email})
        console.log("user:",user)

        const errorMessage = "Email or password invalid"
        //if user is not exist        
        if(!user)
        {
            return res.status(403)
            .json({
                message:errorMessage,
                success:false
            })
        }

        //if user exist

        //checking if password is same as in database
        const isPassSame = await bcrypt.compare(password,user.password)


        //if password entered password and password in database is not same
        if(!isPassSame)
        {
            return res.status(403)
            .json({message:errorMessage,success:false})
        }

        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
        res.status(200)
        .json({
            message:"sing in succesfull",
            success:true,
            jwtToken,
            name:user.name,
            email
        })


    }
    catch(error)
    {
        //if try block throw any error
        res.status(500)
        .json({
            message:"singIn error- internal server error",
            success:true,
            error
        })
    }
}

module.exports={
    singUp,
    singIn
}