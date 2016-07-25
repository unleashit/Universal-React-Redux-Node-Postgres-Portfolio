require('babel-register')({
    presets: ['es2015', 'react']
});

//require('babel-core/register');

var express = require('express');
var app = express();
var path = require('path');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var compression = require('compression');

var models = require("./models");
var createuser = require('./controllers/createUser');

global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
    if (reason.stack) {
        console.error(reason.stack);
    } else {
        console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    }
});

var webpack = require('webpack');
var dev = require('webpack-dev-middleware');
var hot = require('webpack-hot-middleware');
var config = require('../webpack.config.js');


if (!process.env.NODE_ENV) {
    const compiler = webpack(config);

    app.use(dev(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }));
    app.use(hot(compiler));
}

// configure express
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// serve static assets
app.use(express.static('dist'));

// logging
// app.use(require('./logging')); //morgan
//require('express-debug')(app, {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// auth
require('./passport-init');
app.use(require('express-session')({
    secret: 'keyboard cat', resave: false, saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// server routes
app.use((req, res, next) => {
    console.log('client connected');
    res.locals.renderer = 'ejs';
    res.locals.title ='';
    res.locals.metaDesc = '';
    res.locals.auth = req.isAuthenticated();
    res.locals.activeClass = '';
    next();
});

app.use(require(__dirname + '/routes/auth'));

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

// admin router
app.use("/admin", require(__dirname + '/routes/admin'));

// react
var reactApp = require('../app/js/index').serverMiddleware;
app.get('*', reactApp);

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
app.set('port', process.env.PORT || 3100);

models.sequelize.sync({
    force: false,
    logging: function(str) {console.log(str);}
    })
    .then(function () {
        var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
        console.log("Node Environment: " + process.env.NODE_ENV);
    });
});