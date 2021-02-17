var models = require('../models/index.js');
var nodemailer = require('nodemailer');
var config = require('../../config/APPconfig');
var {
    default: validateContact,
} = require('../../app/js/components/contactForm/validations.js');

const checkBan = (email, res) => {
    return models.Ban.findOne({ where: { email } }).catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'problem submitting contact' });
    });
};

exports.handleContactSubmit = function (req, res) {
    const errors = validateContact(req.body);

    if (Object.keys(errors).length > 0) {
        return res.json({
            error: errors,
        });
    }

    const { name, email, phone, message } = req.body;

    checkBan(email, res).then((resp) => {
        if (resp) {
            console.error(
                `${email} is on ban list and attempted to send contact`
            );
            return res.json({
                result: 'Success',
                info: '250 Message received',
            });
        }

        models.Contact.create({
            name: name || null,
            email: email || null,
            phone: phone || null,
            message: message || null,
        })
            .then(() => {
                var textarea = req.body.message;
                textarea = textarea.replace(/\r?\n/g, '<br />');

                config.mailoptions.replyTo = req.body.email;
                config.mailoptions.html = `
                <h3>New Contact</h3>
                From: ${req.body.name}<br>
                email: ${req.body.email}<br>
                phone: ${req.body.phone || 'n/a'}<br><br>
                ${textarea}
                `;

                var transporter = nodemailer.createTransport(config.smtpConfig);

                transporter.sendMail(config.mailoptions, function (
                    error,
                    info
                ) {
                    if (error) {
                        console.log(error);
                        res.json({ result: error });
                    } else {
                        res.json({
                            result: 'Success',
                            info: info.response,
                        });
                    }
                });
            })
            .catch((err) => {
                console.error('Contact db insertion failure: ' + err);
                res.status(500).json({
                    result: 'Error',
                    info: err.status || 500,
                });
            });
    });
};
