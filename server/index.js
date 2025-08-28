const express = require ("express")
const mongoose = require ("mongoose")
require("dotenv").config()

const auth = require("./routes/authRoutes")

PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use("/",auth)

mongoose.connect(process.env.Sphere).then(()=>{
    console.log("DB connected suucessfully")
    app.listen(PORT, ()=>{
        console.log("Server running in port ",PORT)
    })
}).catch(()=>{
    console.log("DB not connected")
})