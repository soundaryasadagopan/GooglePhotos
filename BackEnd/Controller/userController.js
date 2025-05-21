const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const validator = require('validator');

const createToken =async(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = async(req,res)=>{
    try{
    const{email,password} = req.body;
    const user = await userModel.findOne({email});
    console.log("userpassword",user)
     if(!user){
        return res.status(400).json({success:false,message:"User not exists"})
     }
     const isMatch = await bcrypt.compare(password,user.password);
     console.log("isMatch",isMatch);

     if(!isMatch){
        return res.status(404).json({success:false,message:"Incorrect password"})
     }
     const token = await createToken(user._id);
     console.log("token",token)
     return res.status(200).json({success:true,token})
    }catch(error){
        res.status(500).json({success:false,error})
    }

}


const registerUser = async(req,res)=>{
    try{
    const{email,password} =req.body;  

    const exists = await userModel.findOne({email});

    if(exists){
       return  res.json({success:false,message:"User already exists"})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter a valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"please enter a strong password"})
    }

    const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password,salt);

     const newUser = new userModel({
    
        email:email,
        password:hashPassword
     })
     const user = await newUser.save();
     const token =await createToken(user._id)
     res.json({success:true,token})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

module.exports = {loginUser,registerUser}