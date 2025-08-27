const express = require ("express")
const mongoose = require ("mongoose")
require("dotenv").config()

PORT = process.env.PORT || 3000

const app = express()


mongoose.connect(process.env.Sphere).then(()=>{
    console.log("DB connected suucessfully")
    app.listen(PORT, ()=>{
        console.log("Server running in port ",PORT)
    })
}).catch(()=>{
    console.log("DB not connected")
})