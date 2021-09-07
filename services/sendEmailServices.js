var requireDbConnection = require("../dbapi/require_db")
var Users = require('../models/singUpUsers');
var Products = require('../models/products');
const { products_ids } = require("../mappers/addOrderMapper");
var SendEmailDAO = {
    findUserEmail(userId) {
        var query = { "_id": userId };
        return Users.findOne(query);
    },
    findProducts(productsId) {
        return Products.find({ _id: { $in: productsId } })
    }
}
module.exports = requireDbConnection(SendEmailDAO);