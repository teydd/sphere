const express = require("express")
const { signup, verify, signin, logout } = require("../controllers/authControllers")
const route = express.Router()

route.post("/signup",signup)
route.post("/verify",verify)
route.post("/signin",signin)
route.post("/logout",logout)
module.exports = route