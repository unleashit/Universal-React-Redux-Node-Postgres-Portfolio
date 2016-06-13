var express = require('express');
var passport = require('passport');
var _ = require('lodash');
var users = require('../dev_data/users.json');

var router = express.Router();

router.get('/login', function (req, res, next) {

    // auto login as admin
    if (req.app.get('env') === 'development') {
        if (req.query.user) {
            user = _.find(users, u=> u.email === req.query.user);

            req.logIn(user, (err) => {
                if (err) { return next(err); }
                return res.redirect('/');
            });
            return;
        }
    }

    res.render('login', {message: req.flash('error')});
});

router.post("/login", function(req, res, next) {
    var pattern = /^\s*$/;
    if (pattern.test(req.body.username) || pattern.test(req.body.password)) {
        res.render('login', {message: 'Please enter a username and password'});
    } else {
        next();
    }
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;