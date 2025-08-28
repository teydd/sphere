const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const crypto = require ("crypto")
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

const verify = async(req,res)=>{
    const {code} = req.body
    try {
        const user = await User.findOne({
            verificationToken:code
        })
        if(!user){
            return res.status(400).json({
                message:"Invalid code"
            })
        }

        user.isVerified = true
        user.verificationToken = undefined

        await user.save()

        res.status(200).json({
            success:true,
            message:"Verified succesfully",
            ...user._doc,
            password:undefined
        })
    } catch (error) {
        console.log("Error verifying user")        
    }
}

const signin = async(req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        const comparepassword = await bcrypt.compare(password,user.password)
        if(!comparepassword){
            return res.status(400).json({message:"Invalid password"})
        }

        await user.save()
        generateTokeAndCookie(res,user)

        res.status(200).json({
            success:true,
            message:"Sign in successful"
        })
    } catch (error) {
        console.log("Error signing in")        
    }
}

const logout = async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Logout successful"})
}

const forgotPassword = async(req,res)=>{
    const {email}= req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email"})
        }

        const resetToken = await crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1*60*60*1000
        
        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt= resetTokenExpiresAt

        await user.save()

        res.status(200).json({message:"Link sent successfully"})
    } catch (error) {
        console.log("Error in forgot password")        
    }
}

const resetPassword = async (req,res)=>{
    try {
        const {token} = req.params
    const {password} = req.body

        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordTokenExpiresAt:{$gt:Date.now()}
        }) 
        
        if(!user){
            return res.status(400).json({message:"Invalid or expired reset token"})
        }

        const hashedpassword = await bcrypt.hash(password,12)

        user.password = hashedpassword
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiresAt = undefined

        await user.save()

        res.status(200).json({
            success:true,
            message:"Password changed successfully",
            ...user._doc,
            password:undefined
        })
    } catch (error) {
        console.log("Error in reset password")
        res.status(400).json({success:false, message:error.message})        
    }
}
module.exports= {signup,verify,signin,logout,forgotPassword,resetPassword}