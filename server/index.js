const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello from backend")
})

mongoose.connect(process.env.Sphere).then(()=>{
    console.log("Database Connection Successful")
    app.listen(2000,()=>{
        console.log("Server runnin on port 2000")
    })
}
).catch(()=>{
    console.error("Connection failed")
})

