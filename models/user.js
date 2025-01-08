const timestamps  = require('bson');
const mongoose = require('mongoose');
 
const userSchema  = new mongoose.Schema({
    username:{
        type: String ,
        required:true,
     },

    email:{
        type:String,
        required:true
    },

    password:{
        type: String,
        required:true
    }
    
    

},
{ timestamps: true } // Correct

);


module.exports = mongoose.model("user",userSchema);