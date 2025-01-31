const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{type: String, required:true, unique:true},
    products:[
        {
            productId:{
                type: String
            },
            quantity:{
                type: Number,
                default:1,
            }
        }
    ]

})

module.exports = mongoose.model("cart",cartSchema);