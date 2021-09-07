const jwt = require('jsonwebtoken');
var tokenObj = {
    generateAccessToken: function (payload) {
        return jwt.sign({
            email: payload.email,
        }, "secret", { expiresIn: 120 });
    },
    generateRefreshToken: function (payload) {
        return jwt.sign({
            email: payload.email,
        }, "secret", { expiresIn: 180 });
    }
}
module.exports = tokenObj;