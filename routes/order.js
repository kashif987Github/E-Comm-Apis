const express = require('express');
const route = express.Router();
const orderModel = require('../models/order.js');
const isAdmin = require('./varifyToken.js');
 



 route.post("/save",isAdmin,async(req,res)=>{
    const neworder=new order (req.body)
    try{
        const saveorder= await neworder.save()
        res.status(200).json(saveorder);
    }catch(err){
        res.status(500).json(err);

    }
 })


 route.get("/", isAdmin,async(req,res)=>{
    try{
     const order=  await orderModel.find()
          res.status(200).json(order);
      
    }catch(err){
     res.status(500).json(err);
 
 
    }
  })

  

route.delete("/delete", isAdmin, async(req,res)=>{
    try{
        
   await orderModel.findByIdAndDelete(req.params.id)
   res.status(404).json("order has been deleted ")
    }catch(err){
        res.status(500).json(err);

    }

    

})


 

 

module.exports = route