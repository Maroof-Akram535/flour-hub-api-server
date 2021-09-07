var nodemailer = require('nodemailer');
var sendEmailDAO = require('../services/sendEmailServices');
var fs = require('fs');
function sendEmail(req, res, next) {
    sendEmailDAO.findUserEmail(req.body.userId).then(res => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 8080,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'maroofakramofficial@gmail.com',
                pass: 'ranapafnust1'
            }
        });
        var mailOptions = {
            from: 'maroofakramofficial@gmail.com',
            to: res.email,
            subject: 'Order Booked On Flour Hub!',
            text: req.body.message
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                next();
            }
        });
    })
}
module.exports = sendEmail;