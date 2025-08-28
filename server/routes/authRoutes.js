const express = require("express")
const { signup, verify, signin } = require("../controllers/authControllers")
const route = express.Router()

route.post("/signup",signup)
route.post("/verify",verify)
route.post("/signin",signin)
module.exports = route