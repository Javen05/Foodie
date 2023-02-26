const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.header("Authorization");

    if (!token) {
        return res.json({
            success: false,
            message: "Missing token"
        }).status(401);
    }
    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.sub;
        next()
        
    } catch (err) {
        return res.json({
            success: false,
            message: "Invalid token"
        }).status(401);
    }
}