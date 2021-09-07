var connection = require('mongoose');
var Schema = connection.Schema;
var Products = new Schema({
    name:
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    weight:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    id:
    {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    }

}, { strict: false });
module.exports = connection.model("Products", Products);        