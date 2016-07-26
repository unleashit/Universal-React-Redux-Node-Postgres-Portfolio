var models = require('../models/index.js');
var nodemailer = require('nodemailer');
var path = require('path');
var config = require(path.join(__dirname, '/../config/appConfig')).config;

exports.handleContactSubmit = function(req, res) {
    // models.Portfolio
    //     .findAll({limit: 20})
    //     .then((items) =>{
    //         res.json(items);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })

    config.mailoptions.html = `
        <h3>New Contact</h3>
        <p>From: ${req.body.name}</p>
        <p>email: ${req.body.email}</p>
        <p>phone: ${req.body.phone}</p>
        <p>${req.body.message}</p>
    `;

    var transporter = nodemailer.createTransport(config.smtpConfig);

    transporter.sendMail(config.mailoptions, function(error, info){

        if(error){
            console.log(error);
            res.json({result: error});

        } else {
            res.json({result: 'Success', info: info.response});
        }
    });
};
