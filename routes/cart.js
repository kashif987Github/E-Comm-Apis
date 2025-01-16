const express = require ('express');
const isLoggedin = require('./varifyToken');
const cartModel = require("../models/cart.js")
 const route = express.Router();



 route("/save",isLoggedin,async(req,res)=>{
    const newcart=new cart (req.body)
    try{
        const savecart= await newcart.save()
        res.status(200).json(savecart);
    }catch(err){
        res.status(500).json(err);

    }
 })


 route.get("/", isLoggedin,async(req,res)=>{
    try{
     const cart=  await cartModel.find()
          res.status(200).json(cart);
      
    }catch(err){
     res.status(500).json(err);
 
 
    }
  })

 /// get user cart
 route.get("/find/:userId", isLoggedin,async(req,res)=>{
   try{
    const cart=  await cartModel.findOne({
 
        userId: req.params.userId
         })
         res.status(200).json(cart);
     
   }catch(err){
    res.status(500).json(err);


   }
 })

 
  route.put("/update/:id", isLoggedin, async(req,res)=>{
     try{
         
     const cartId = req.params.id;
     const updatedcart = await cartModel.findByIdAndUpdate(cartId,req.body,{new:true});
     if(!updatedcart) return res.status(404).json("cart not found");
     res.status(200).json(updatedcart); 
     }catch(err){
         res.status(500).json({error: err.message});
     }
  })
 

route.delete("/delete", isLoggedin, async(req,res)=>{
    try{
        
   await cartModel.findByIdAndDelete(req.params.id)
   res.status(404).json("cart has been deleted ")
    }catch(err){
        res.status(500).json(err);

    }

    

})


 

 module.exports = route