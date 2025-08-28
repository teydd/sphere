const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const { generateTokeAndCookie } = require("../util/generateTokenAndCookie");

const signup = async (req,res)=>{
    const {email,password,name} = req.body

    try {
        if(!email||!password||!name){
            throw new Error("All fields are required");            
        }

        const exist = await User.findOne({email})
        if(exist){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedpassword = await bcrypt.hash(password,12)
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString()

        const user = new User({
            email,
            password:hashedpassword,
            name,
            verificationToken
        })

        await user.save()
        generateTokeAndCookie(res,user)
        
        res.status(201).json({
            success:true,
            message:"User created successfully",
            ...user._doc,
            password:undefined
        })
    } catch (error) {
        console.log("Error signing up")        
    }
}

module.exports= {signup}