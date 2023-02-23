const express=require("express")

const app=express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');


const UserModel=require("../Model/userModel")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("userpage")
})

app.post("/register",async(req,res)=>{
    const {username,email,password,location}=req.body
    try{
        bcrypt.hash(password, saltRounds, async(err, hash) =>{
            if(err){
                res.send({msg:"user is note created",err:err.message})  
            }
            else{
                const user=await UserModel({username,email,password:hash,location})
                await user.save()
                res.send("user created successfully")
            }
        });
    }
    catch(err){
       res.send({msg:"user is note created",err:err.message})
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
      const user=await UserModel.find({email})
      if(user.length>0){
        bcrypt.compare(password, user[0].password, (err, result)=> {
            if(result){
                const token = jwt.sign({ userId: user[0]._id }, 'login');
                res.send({msg:"user login successfully",token:token})
            }
            else{
                res.send({msg:"you enter wrong details"})
            }
        });
      }
    }
    catch(err){
        res.send({msg:"user is not loggedin",err:err.message})
    }
})


module.exports=app