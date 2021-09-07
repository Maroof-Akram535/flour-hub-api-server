var connection = require('mongoose');
var Schema = connection.Schema;
var LoginsRefreshToken = new Schema({
    email: String,
    token: String
}, { strict: false });
module.exports = connection.model("loginsRefreshTokens", LoginsRefreshToken);        