var connection = require('mongoose');
var Schema = connection.Schema;
var Categories = new Schema({
    name: String,
    description: String,
    img: {
        data: Buffer,
        contentType: String
    }
}, { strict: false });
module.exports = connection.model("Categories", Categories);        