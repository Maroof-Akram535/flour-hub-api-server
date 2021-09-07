const Tokens = require("../tokens/tokenGenerator");
const UserDAO = require('../services/userServices');
const AdminDAO = require('../services/adminServices');
const jwt_decode = require("jwt-decode");
const BaseUrl = '/flourhub';
module.exports = (router) => {
    router.post(BaseUrl + '/login', async (req, res, next) => {
        if (req.body.userRole === 'admin') {
            await AdminDAO.authenticateAdmin(req.body.userEmail, req.body.userPassword, req.body.userRole).then(userInfo => {
                if (userInfo) {
                    res.send({ userInfo });
                }
                else {
                    res.send({ message: "You are Not Admin" })
                }
            })
        }
        else {
            await UserDAO.authenticateUser(req.body.userEmail, req.body.userPassword).then(userInfo => {
                var userEmail = userInfo.userEmail;
                if (userInfo !== null) {
                    let accessToken = Tokens.generateAccessToken({ email: req.body.userEmail });
                    let refreshToken = Tokens.generateRefreshToken({ email: req.body.userEmail });
                    UserDAO.createToken({ refreshToken, userEmail });
                    res.send({ accessToken, userInfo });
                }

            }).catch(err => {
                console.log("Here it is ", err);
                res.send({ message: "User Not Found" })
            })
        }
    }),
        router.post(BaseUrl + "/signUp", async (req, res, next) => {
            var userInfo = req.body;
            UserDAO.createUser(userInfo).then(user => {
                res.send(true)
            }).catch(err => {
                res.send(false);
            })
        })
        , router.get(BaseUrl + "/userOrders", async (req, res, next) => {
            var query = require('url').parse(req.url, true).query;
            var uid = query.uid;
            console.log("user id", uid);
            UserDAO.userOrders(uid).then(orderDetails => {
                console.log(orderDetails);
                res.send(orderDetails)
            }).catch(err => {
                res.send(false);
            })
        })
}

        // router.post('/refreshToken', async (req, res) => {
        //     const authHeader = req.headers['authorization']
        //     const token = authHeader && authHeader.split(' ')[1];
        //     let decode = jwt_decode(token);
        //     let userEmail = decode.email;
        //     let freshAccesToken = await refreshAccessToken({ email: userEmail });
        //     res.send(freshAccesToken);
        // })