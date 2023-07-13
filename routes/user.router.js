
const express = require("express")
// const {validator} = require("../middleware/validator")
const {UserModel} = require("../model/user.model")
const {blacklist} = require("../blacklist")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { auth } = require("../middleware/auth");
 const UserRouter = express.Router()

 UserRouter.post("/register",async(req,res)=> {    
    const {email,password,confirm_password} = req.body
    try {
        const findUser = await UserModel.find({email})
        if(email === findUser.email){
            res.status(200).json({msg:"user is already exist"})
        }else{
            bcrypt.hash(password, 5, (err, hash)=> {
                const user = new UserModel({email,password:hash,confirm_password})
                 user.save()
                res.status(200).json({msg:"The new user has been registered", registeredUser:req.body})
            });
        } 
    } catch (error) {
        res.status(400).json({err:error.message})   
    }
 })


 
 
 UserRouter.post("/login", async(req,res)=> {
    const {email,password} = req.body;
     try {
    const user = await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password, user.password,(err, result)=> {
            if(result){
              var token = jwt.sign({ authorID:user._id, author:user.name}, 'masai');
                res.status(200).json({mas:"Login successful!", token:token})
            }else{
                res.status(200).json({msg:"wrong credential!!!"})
            }
        });
    }else{
        res.status(200).json({msg:"user not found"})  
    }
     } catch (error) {
        res.status(400).json({err:err.message})  
     }   
    })
 
  UserRouter.get("/logout",auth,(req,res)=> {
    const token = req.headers.authorization?.split(" ")[1]
try {
blacklist.push(token)
   res.status(200).json({msg:"the user gas been logged out"})
} catch (error) {
    res.status(400).json({err:error.message})
}    
  })  

 module.exports = {
    UserRouter
 }
