const mongoose = require('mongoose');
const { Timestamp } = require('bson');

const { title } = require('process')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    description:{type:String, required:true},
    image:{type:String},
    categories:{type:Array,required:true},
    size:{type:String},
    price:{type:Number,required:true}

},
{timestamps:true}
)

module.exports=mongoose.model("product",productSchema);