var connection = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = connection.Schema;
var Users = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    city: String,
    role: {
        type: String,
        select: false
    }
}, { strict: false });
module.exports = connection.model("Users", Users);
Users.plugin(uniqueValidator, { message: 'Email Already Exist Try Another Email address' });