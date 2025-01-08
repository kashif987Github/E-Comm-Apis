const { error } = require('console');
const express = require('express');
const app = express();
const mongoose =require ('mongoose');
const dotenv = require('dotenv');
const userRoute = require("./routes/user.js")
const authRoute = require("./routes/auth.js")
const productRoute = require("./routes/product.js")
dotenv.config();

const port = 3000;

app.use(express.json());


mongoose.connect(
    process.env.MONGO_URL
).then(()=>{
    console.log("db connection successful ");
}).catch((err)=>{
    console.log(err)
});

// routes


app.use("/api/auth",authRoute)
 app.use("/api/user",userRoute)
 app.use("/api/product",productRoute)



app.listen(port,(req,res)=>{
    console.log(`server is running on the port number ${port}`);
})