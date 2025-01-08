const express= require("express");
const route = express.Router();
const userModel = require("../models/user.js")
const isLoggedin = require("./varifyToken.js")


route.get("/find",async(req,res)=>{
    const alldata= await userModel.find({

    })
    res.send(alldata);
})
   // delete

  route.delete("/delete:id" ,isLoggedin , async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been delete")

    }catch(err){
        res.status(500).json(err)

    }
  })

  route.get("/:id",isLoggedin,async (req,res)=>{
    try{
        
  const user = await  userModel.findById(req.params.id);
  res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
  })


route.post("/update/:id" ,isLoggedin , async(req,res)=>{
    try{
        const userId = req.params.id.trim();
        const result = await userModel.findByIdAndUpdate(userId,req.body,{new:true,runValidators: true})
        if(!result) res.status(500).json("user not find");
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = route                                 