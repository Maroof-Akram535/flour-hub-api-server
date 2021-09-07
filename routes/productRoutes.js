const BaseUrl = '/flourhub';
var ProductDAO = require('../services/productServices');
var verifyToken = require('../authentication/tokensAuth');
var fs = require('fs');
module.exports = (router) => {
    router.get(BaseUrl + '/findProducts', async (req, res, next) => {
        var query = require('url').parse(req.url, true).query;
        var productName = query.productName;
        await ProductDAO.findProducts(productName).then(products => {
            res.send(products);
        }).catch(err => {
            return err;
        })
    })
}