var requireDbConnection = require("../dbapi/require_db")
var Products = require('../models/products');
var ProductDAO = {
    findProducts(category) {
        var query = { category: category }
        return Products.find(query);

    }
}
module.exports = requireDbConnection(ProductDAO);