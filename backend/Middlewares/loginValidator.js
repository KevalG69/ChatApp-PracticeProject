//modules
const Joi = require("joi")

//middle ware to first validate data recived


//validator for singUp
const singUpValidator = (req,res,next)=>{

    //creating schema
    const schema = Joi.object({
        name:Joi.string().min(4).max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(50).required()
    })

    //validating data in req.body and extract error from it
    const {error} = schema.validate(req.body)
    console.log(req.body)

    //if there is any error exist
    if(error)
    {
        return res.status(404)
                .json({message:"Validation Error",error})
    }

    //if there is no error then move it to next
    next();
}


//validator for singIn

const singInValidator = (req,res,next)=>{

    //creating schema
    const schema =Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(50).required()
    })

    //validating data in req.body
    const {error} = schema.validate(req.body)

    //if there is any error exist 
    if(error)
    {
        return res.status(404)
                .json({message:"validation error",error})
    }

    //if there is no error the move it to next
    next();
}


module.exports = {
    singUpValidator,
    singInValidator
}