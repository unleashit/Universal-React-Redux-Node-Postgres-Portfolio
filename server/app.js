'use strict';

var express = require('express');
var app = express();
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');

var models = require("./models");

var createuser = require('./controllers/createUser');

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from '../app/js/routes';

// configure express
app.set("views", "./server/views");
app.set("view engine", "ejs");

// serve static assets
app.use(express.static('dist'));
app.use(express.static('node_modules/bootstrap/dist'));
//app.use(express.static('node_modules/jquery/dist'));

// logging
// app.use(require('./logging')); //morgan
require('express-debug')(app, {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
require('./passport-init');
app.use(require('express-session')({
    secret: 'keyboard cat', resave: false, saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use((req, res, next) => {
    console.log('client connected');
    res.locals.title ='';
    res.locals.metaDesc = '';
    res.locals.auth = req.isAuthenticated();
    res.locals.activeClass = '';
    next();
});

app.use(require(__dirname + '/routes/auth'));

app.get('*', (req, res, next) => {
    // routes is our object of React routes defined above
    match({ routes, location: req.url }, (err, redirectLocation, props) => {
        if (err) {
            // something went badly wrong, so 500 with a message
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            // we matched a ReactRouter redirect, so redirect from the server
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (props) {
            // if we got props, that means we found a valid component to render
            // for the given route
            //const markup = renderToString(<RouterContext {...props} />);
            const markup = renderToString(<RouterContext {...props} />);

            // render `index.ejs`, but pass in the markup we want it to display
            res.render('index', { reactHtml: markup })

        } else {
            // no react route match, so continue on to server routing
            next();
        }
    });
});

app.route('/signup')
    .get((req, res) => {
        res.render("signup", { title: 'Signup', error: req.flash('error') });
    })
    .post(createuser.signup);

var apiRouter = require(__dirname + '/routes/api');
app.use("/api", apiRouter);

//authenticated routes below here

app.use('/admin*', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
        return;
    }
    res.redirect('/login');
});

var adminRouter = require(__dirname + '/routes/admin');
app.use("/admin", adminRouter);

// 404 handling
app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('error', { status: 404, url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            status: 500,
            stack: err.stack
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var debug = require('debug')('jg');
app.set('port', process.env.PORT || 3000);

models.sequelize.sync({
    force: false,
    logging: function(str) {console.log(str);}
    })
    .then(function () {
        var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
});