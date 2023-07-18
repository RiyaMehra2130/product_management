const express=require("express")
const route=express.Router()
const {signUp,login,getUserName}=require('../Controller/userController')
const { validate_mid } = require("../Middleware/authM")

route.post("/signup",validate_mid,signUp)
route.post('/login',login)
route.get('/getUserName',getUserName)

module.exports=route;