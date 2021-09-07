var requireDbConnection = require("../dbapi/require_db");
var Products = require('../models/products');
var productMapper = require('../mappers/productmapper');
var Users = require("../models/singUpUsers");
var fs = require('fs');
var path = require('path');
var ObjectId = require('mongodb').ObjectID;
var AdminDAO = {
    createProduct(productDetails) {
        console.log(productDetails.file)
        const data = JSON.parse(productDetails.body.productData);
        console.log("datta", data);
        Products.create({
            [productMapper.name]: data.productName,
            [productMapper.category]: data.productCategory,
            [productMapper.weight]: data.productWeight,
            [productMapper.price]: data.productPrice,
            [productMapper.id]: data.productId,
            [productMapper.date]: data.productDate,
            img: {
                data: fs.readFileSync(path.join('./uploads/' + productDetails.file.filename)),
                contentType: 'image/png'
            }
        }
        )
    },
    showAllProducts() {
        var products = Products.find();
        return products;
    },
    deleteProduct(pid) {
        pid = ObjectId(pid);
        var myQuery = { "_id": pid }
        Products.deleteOne(myQuery, function (err, res) {
            if (err) throw err;
            return ("document Deleted");
        });
    },
    updateProduct(productInfo) {
        productInfo.pid = ObjectId(productInfo.pid);
        Products.updateOne(
            { "_id": productInfo.pid },
            { $set: { "name": productInfo.productValues.name, "price": productInfo.productValues.price, "weight": productInfo.productValues.weight } }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            }
        )
    },
    authenticateAdmin(userEmail, userPassword, userRole) {
        var query = { email: userEmail, password: userPassword, role: userRole }
        return Users.findOne(query)
    }
}
module.exports = requireDbConnection(AdminDAO);