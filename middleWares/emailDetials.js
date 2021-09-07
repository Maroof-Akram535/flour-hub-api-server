var sendEmailDAO = require('../services/sendEmailServices');
function getEmailDetials(orderDetails) {
    var productDetails = [];
    sendEmailDAO.findProducts(orderDetails.productsId).then(res => {
        res.forEach(element => {
            productDetails.push({ ProductName: element.name, ProductWeight: element.weight, ProductPrice: element.price })
        });
    })
    return productDetails;
}
module.exports = getEmailDetials;