const express = require('express');
const route = express.Router();
const userModel = require("../models/user.js");
const CryptoJS = require('crypto-js');
const Jwt = require ('jsonwebtoken');

// REGISTER 

route.post("/register",async (req,res)=>{
    // const {username, email,password} = req.body
    const alreadyuser = await userModel.findOne({email:req.body.email});
    if(alreadyuser){
        res.status(200).json("email has already registered .. please login")
    }

 const newuser =  await userModel({
    username:req.body.username,
    email:req.body.email,
    password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(), 

    })

    try{
        const saveduser = await newuser.save();
       res.status(201).json(saveduser);


    }catch(err){
        res.status(500).json({
            message:"internal error",
            error:err.message
        });

    }


})


// LOGIN 

route.post("/login",async(req,res)=>{
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            res.send("wrong credential");

        };

                // Decrypt and compare password

        const hashedpassword =CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const orignalpassword = hashedpassword.toString(CryptoJS.enc.Utf8);

        if( orignalpassword  !== req.body.password ) return res.status(401).json("wrong password");

        // Generate JWT token

        const accessToken= Jwt.sign({
            id:user._id

        },process.env.JWT_SEC,{expiresIn:"3d"})


                  // Send response

         res.status(200).json({user,accessToken});


    }catch(err){
        res.status(500).json(err);
    }
})





module.exports = route