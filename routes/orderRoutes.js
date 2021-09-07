const BaseUrl = '/flourhub/';
var OrderDAO = require('../services/orderServices');
var sendEmail = require('../middleWares/sendEmail');
module.exports = (router) => {
    router.post(BaseUrl + '/addToOrders', sendEmail, (req, res) => {
        OrderDAO.addOrders(req.body).then(result => {
            console.log("Added")
        })
        sendEmail(req.body);
    })
    router.get(BaseUrl + 'admin/showAllorders', (req, res, next) => {
        OrderDAO.showAllOrders().then(orders => {
            res.send(orders);
        })
    })
    router.delete(BaseUrl + 'admin/deleteOrder', (req, res, next) => {
        OrderDAO.deleteOrder(req.body.pId).then(res => {
            return res;
        })
    })
    router.put(BaseUrl + 'admin/updateOrderStatus', (req, res, next) => {
        console.log("jsajdjsdas", req.body)
        OrderDAO.updateOrderStatus(req.body).then(orders => {
            res.send(orders);
        })
    })
}