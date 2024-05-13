const User = require("../models/User")
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')
const login = async (req,res)=>{

    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({message:'All fields are required'})
    }
    const user=await User.findOne({username:username}).lean()
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized!' })
    }
    const isCompare=await bcrypt.compare(password,user.password)
    if(!isCompare){
        return res.status(401).json({ message: 'Unauthorized!' })
    }
    const userToToken={
        _id:user._id,name:user.name,roles:user.roles, username:user.username,email:user.email,phone:user.phone
    }

    const accessToken= await jwt.sign(userToToken,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken,role:user.roles,name:user.name})

 }
const register = async (req,res)=>{
    const {username, password, name, email, phone} = req.body
    if (!name || !username || !password||!phone) {
        return res.status(400).json({message:'All fields are required'})
    }
    const duplicate=await User.findOne({username:username}).lean()
    if(duplicate){
        return res.status(409).json({message:"The username is Duplicate:("})
    }
    const hashpwd=await bcrypt.hash(password,10)
    const userObject={username:username, password:hashpwd, name, email, phone}
    const user=await User.create(userObject)
    if (user) { 
        return res.status(201).json({message:`Hello new user ${user.username}
        created` })
    } 
    else {
        return res.status(400).json({message:'Invalid user received'})
    }

}


module.exports = {login, register}