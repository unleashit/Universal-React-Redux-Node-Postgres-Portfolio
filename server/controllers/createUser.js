var bcrypt = require('bcryptjs'),
    model = require('../models');

module.exports.show = function(req, res) {
    res.render('/signup')
};

module.exports.signup = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    if (!email || !password || !password2) {
        req.flash('error', "Please, fill in all the fields.");
        return res.redirect('/signup');
    }

    if (password !== password2) {
        req.flash('error', "Please, enter the same password twice.");
        return res.redirect('/signup');
    }

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    var newUser = {
        email: email,
        salt: salt,
        password: hashedPassword
    };

    model.User.create(newUser).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        req.flash('error', "That email already exists in the system");
        return res.redirect('/signup');
    })
};