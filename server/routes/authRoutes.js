const express = require("express")
const { signup, verify } = require("../controllers/authControllers")
const route = express.Router()

route.post("/signup",signup)
route.post("/verify",verify)

module.exports = route