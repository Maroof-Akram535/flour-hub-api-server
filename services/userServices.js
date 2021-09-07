var requireDbConnection = require("../dbapi/require_db")
var Users = require("../models/singUpUsers");
var Orders = require("../models/orders");
var ObjectId = require('mongodb').ObjectID;
var LoginRefreshToken = require("../models/loginUsers");
var UsersDAO = {
    async createUser(user) {
        var newUser = await Users.create({
            name: user.userName,
            email: user.userEmail,
            password: user.userPassword,
            city: user.userCity,
            role: user.userRole
        })
        return newUser;
    },
    fetchData() {
        var results = Users.find();
        return results;
    },
    authenticateUser(userEmail, userPassword) {
        var query = { email: userEmail, password: userPassword }
        return Users.findOne(query)
    },
    createToken(Tokendetails) {
        LoginRefreshToken.create({ email: Tokendetails.userEmail, token: Tokendetails.refreshToken });
    },
    userOrders(id) {
        id = ObjectId(id)
        return Orders.aggregate([
            {
                $match: {
                    $and:
                        [
                            { user_id: { $eq: id } },
                            { status: { $ne: "Delete" } }
                        ]
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: "products_ids",
                    foreignField: "_id",
                    as: "porductDetails"
                }
            }
        ])
    }
}
module.exports = requireDbConnection(UsersDAO);
