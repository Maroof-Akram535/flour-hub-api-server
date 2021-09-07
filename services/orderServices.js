var requireDbConnection = require("../dbapi/require_db");
var Orders = require('../models/orders');
var ObjectId = require('mongodb').ObjectID;
var addOrderMapper = require('../mappers/addOrderMapper');
var OrderDAO = {
    showAllOrders() {
        var orders = Orders.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: "products_ids",
                    foreignField: "_id",
                    as: "porductDetails"
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            }
        ])
        return orders;
    },
    addOrders(orderDetails) {
        Orders.create({
            [addOrderMapper.user_id]: orderDetails.userId,
            [addOrderMapper.products_ids]: orderDetails.productsId,
            [addOrderMapper.order_Adress]: orderDetails.adress,
            [addOrderMapper.order_date]: orderDetails.date,
            [addOrderMapper.user_Cell]: orderDetails.phoneNumber,
            status: "Accept Order"
        })
    },
    deleteOrder(orderId) {
        var myQuery = { '_id': orderId };
        Orders.deleteOne(myQuery, function (err, res) {
            if (err) throw err;
            return ("document Deleted");
        });
    },
    updateOrderStatus(details) {
        details.id = ObjectId(details.id);
        Orders.updateOne(
            { "_id": details.id },

            {
                $set: {
                    "status": details.status
                }
            }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            }

        )
    }
}
module.exports = requireDbConnection(OrderDAO);