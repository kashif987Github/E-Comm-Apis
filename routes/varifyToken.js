const jwt = require("jsonwebtoken");


// const verifyToken = (req,res,next)=>{
//     const authHeader = req.headers.token

//     if(authHeader){
//         jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
//             if(err) res.status(403).json("token invalid");
//             req.user=user;
//             next();
//         })
//     }else{
//         res.status(401).json("you are not authenticaed!");
//     }
// }



function isLoggedin(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.redirect("/login");
            req.user = user; // Attach user info to the request
            return next(); // Proceed if token is valid
        });
    } else {
        res.redirect("/login"); // Redirect if no token is provided
    }
}



module.exports = isLoggedin