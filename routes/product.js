const express = require('express');
const productModel =require("../models/product.js");
const product = require('../models/product.js');

const route = express.Router();

route.get("/",async(req,res)=>{
  const allproduct=  await productModel.find({

    })
    res.send(allproduct);

})

//create 
 
 route.post("/create", async (req,res)=>{
    const newproduct= new product(req.body)
    try{
        const savedproduct = await newproduct.save()
        res.status(200).json(savedproduct);
    }catch(err){
        res.status(500).json(err);


    }

 })


 route.put("/update/:id", async(req,res)=>{
    try{
        
    const productId = req.params.id;
    const updatedproduct = await productModel.findByIdAndUpdate(productId,req.body,{new:true});
    if(!updatedproduct) return res.status(404).json("product not found");
    res.status(200).json(updatedproduct);
    }catch(err){
        res.status(500).json({error: err.message});
    }
 })

route.delete("/delete", async(req,res)=>{
    try{
        
   await productModel.findByIdAndDelete(req.params.id)
   res.status(404).json("product has been deleted ")
    }catch(err){
        res.status(500).json(err);

    }

    

})





module.exports = route
