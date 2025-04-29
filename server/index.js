const express = require ("express")
const mongoose = require ("mongoose")
const app = express()

app.listen(4000, ()=>{
    console.log("Server running on port 4000")
})

app.get("/" , (req,res)=>{
    res.send("hello from backend")
})

mongoose.connect("mongodb+srv://chemosted:Z7u5KfXE0U8nDjBz@node.ehk5txt.mongodb.net/?retryWrites=true&w=majority&appName=node")
.then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log("connection failed")
})