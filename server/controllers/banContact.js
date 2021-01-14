var models = require('../models/index.js');
var config = require('../../config/APPconfig');

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const banContact = function(req, res) {
    const { email } = req.body;

    if (!validateEmail(email)) {
        console.error('Could not validate email of banned contact');
        return res.status(400).json({
            error: "Bad Request"
        });
    }

    models.Ban.create({
        email,

    })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('Ban email insertion failure: ' + err);
            res.sendStatus(err.status || 500);
        });
};

module.exports = banContact;
