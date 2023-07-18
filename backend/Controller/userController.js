const userModel = require("../Modal/userModel")
const jwt=require('jsonwebtoken')

exports.signUp=async(req,res)=>
{
    const {uname,email,password,r_password}=req.body
    console.log(uname,email,password,r_password)
    try{
    const user=await userModel.create({
     User:uname,
     Email:email,
     Password:password,
     ConfirmPassword:r_password
    })
    return res.status(200).json({success:true,msg:"USER CREATED SUCCESSFULLY"})
}
catch(e)
{
 return res.status(404).json({success:false,msg:"ERROR"})
}
}

exports.login=async(req,res)=>
{
    const {email,password}=req.body
    console.log(email,password)
try{
    const user=await userModel.findOne({where:{Email:email}})
    console.log("user=",user)
    if(!user)
    {
        return res.status(200).json({success:true,msg:"USER NOT FOUND"})
    }
    const match=user.Password===password
    console.log("user password",user.Password)
    console.log("password=",password)
    console.log("match="+match)
    if(!match)
    {
        return res.status(200).json({success:true,msg:"PASSWORD INCORRECT"})
    }
    const token=jwt.sign({user:user},"KEEPSMILING")
    return res.status(200).json({success:true,msg:"LOGIN SUCCESSFULLY",token:token,userId:user.Id})
}
catch(e)
{
    return res.status(404).json({success:false,msg:"ERROR"})
}
}

exports.getUserName=async(req,res)=>
{
    const token=localStorage.getItem("token")
    console.log("token=",token)
    const user=await jwt.decode(token)
    console.log(user)
    return res.status(200).json({success:true})
}