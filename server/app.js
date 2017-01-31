require('babel-register')({
    presets: ['es2015', 'react']
});

var express = require('express');
var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var http = require('http').Server(app);
var path = require('path');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var APPconfig = require('../config/APPconfig');
var compression = require('compression');

var models = require("./models");

global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';

// configure webpack middleware
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
app.use(require('./redirects'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logging
// app.use(require('./logging')); //morgan
// require('express-debug')(app, {});

// global vars
app.use((req, res, next) => {
    console.log('client connected');
    res.locals.renderer = 'ejs';
    res.locals.title ='';
    res.locals.metaDesc = '';
    res.locals.auth = req.isAuthenticated();
    res.locals.activeClass = '';
    next();
});

// Sessions and auth
var DBconfig = require('../config/DBconfig.json')[process.env.NODE_ENV || 'development'];
var mysqlStoreOptions = {
    host: DBconfig.host,
    port: 3306,
    user: DBconfig.username,
    password: DBconfig.password,
    database: DBconfig.database,
    checkExpirationInterval: 3600000,
    expiration: 432000000,
};
var sessionStore = new MySQLStore(mysqlStoreOptions);
app.use(session({
    key: APPconfig.__SESSION_KEY__,
    secret: APPconfig.__SESSION_SECRET__,
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

require('./services/passport-config');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// auth routes
app.use(require(__dirname + '/routes/auth'));

// api routes
app.use("/api", require(__dirname + '/routes/api'));

// authenticate admin routes
app.use('/admin*', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
        return;
    }
    res.redirect('/login');
});

// admin routes
app.use("/admin", require(__dirname + '/routes/admin'));

// react routes (all other http)
app.get('*', require('../app/js/index').serverMiddleware);

// socket.io
require('./routes/liveChat').socketio(http, sessionStore);

// 404 handling
app.use(function(req, res, next){
    res.status(404);
    
    if (req.accepts('html')) {
        res.render('error', { status: 404, url: req.url });
        return;
    }
    
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    
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
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
    if (reason.stack) {
        console.error(reason.stack);
    } else {
        console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    }
});

var debug = require('debug')('jg');
app.set('port', process.env.PORT || 3100);

models.sequelize.sync({
    force: false,
    logging: function(str) {console.log(str);}
    })
    .then(function () {
        var server = http.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
            console.log("Node Environment: " + process.env.NODE_ENV);
        });
});