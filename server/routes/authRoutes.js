const express = require("express")
const { signup, verify, signin, logout, forgotPassword, resetPassword } = require("../controllers/authControllers")
const route = express.Router()

route.post("/signup",signup)
route.post("/verify",verify)
route.post("/signin",signin)
route.post("/logout",logout)
route.post("/forgot-password",forgotPassword)
route.post("/reset-password/:token",resetPassword)
module.exports = route