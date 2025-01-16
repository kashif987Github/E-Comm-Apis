const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization; // Use `authorization` header standard

    if (authHeader) {
        // Ensure the token starts with 'Bearer '
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token is invalid or expired" });
            }

            req.user = user; // Attach the user object to the request
            next(); // Pass control to the next middleware
        });
    } else {
        res.status(401).json({ message: "You are not authenticated!" });
    }
};

module.exports = isAdmin;



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




module.exports ={ isLoggedin ,isAdmin}