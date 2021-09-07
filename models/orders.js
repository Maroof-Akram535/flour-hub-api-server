var connection = require('mongoose');
var Schema = connection.Schema;
var ObjectId = require('mongodb').ObjectID;
var Orders = new Schema({
    user_id: ObjectId,
    products_ids:
    {
        type: [ObjectId],
    },
    order_Adress: String,
    user_Cell: String,
    order_date: String,
    status: String
})
module.exports = connection.model('Orders', Orders);