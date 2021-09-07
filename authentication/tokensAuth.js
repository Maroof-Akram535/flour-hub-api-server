const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");
// const RefreshToken = require('./refreshaccesToken');
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    var decode = jwt_decode(token);
    if (!token) {
        return res.status(403).send();
    }
    try {
        jwt.verify(token, "secret")
        next();
    }
    catch (e) {
        console.log("Error")
        return res.status(401).send();
    }
}
module.exports = authenticateToken;