var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var bcrypt = require('bcryptjs');
var _ = require("lodash");
var model = require('./../models/index');
var config = require('./../../config/APPconfig').githubAuth || {};

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done){
    model.User.findOne({
        where: {
            'email': email
        }
    })
    .then(function(user) {
        //console.log('you typed: ' + email, password);

        if (user === null) {
            return done(null, false, {message: 'Incorrect credentials.'})
        }

        var hashedPassword = bcrypt.hashSync(password, user.salt);

        if (user.password === hashedPassword) {
            return done(null, user);
        }

        return done(null, false, {message: 'Incorrect credentials.'});
    })
    }
));

passport.use(new GitHubStrategy({
        clientID: config.GITHUB_CLIENT_ID || 'add_github_credentials_to_githubAuth_property_in_APPconfig',
        clientSecret: config.GITHUB_CLIENT_SECRET || 'add_github_credentials_to_githubAuth_property_in_APPconfig',
        callbackURL: "/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
       console.log(accessToken, refreshToken);
        model.User.findOrCreate({
            where: {
                github_userID: profile.id
            },
            defaults: {
                email: profile._json.email || profile.id + '@github.com',
                github_userID: profile.id || null,
                github_userName: profile.username || null,
                github_email: profile._json.email || null,
                github_repos: profile._json.public_repos || null,
                github_access_token: accessToken,
                github_refresh_token: refreshToken,
            }
        })
        .then(function (user) {
            return done(null, user);
        })
        .catch(function(err) {
            console.log('Error: ' + err);
            return done(err);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
