const jwt = require("jsonwebtoken")

const verifyToken = async(req,res,next)=>{
    const token = res.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorised - no token provided"
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT)
        if(!decode){
            return res.status(401).json({
                message:"Unauthorised - invalid token"
            })
        }

        req.userId = decode.userId
        next()
    } catch (error) {
        console.log("Error verifying token")
        res.status(400).json({
            message:"Server error"
        })       
    }
}

module.exports= {verifyToken}