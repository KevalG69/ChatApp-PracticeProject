//modules
const jwt = require("jsonwebtoken")

const authValidator = (req,res,next)=>{
   const auth = req.header("Authorization") 

   if(!auth)
   {
        res.status(403)
        .json({
            message:"Unauthorized jwt token is required"
        })
   }
   try
   {
       const decoded = jwt.verify(auth,process.env.JWT_SECRET);
       console.log(decoded);
       req.user = decoded;
       next();
   }
    catch(error)
    {
        res.status(403)
        .json({
            message:"Unauthorized jwt token is required"
        })
    }

}

module.exports = authValidator