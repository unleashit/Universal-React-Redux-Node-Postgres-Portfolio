module.exports = function () {
    const express = require('express');
    const app = express();
    const http = require('http').Server(app);
    const path = require('path');
    const flash = require('connect-flash');
    const bodyParser = require('body-parser');
    const passport = require('passport');
    const compression = require('compression');
    const addSessionTable = require('./sessions');
    const config = require('../config/APPconfig');

    const models = require('./models');

    // varables to be passed to the client as scripts in root html template (root.js)
    global.__ENVIRONMENT__ = process.env.NODE_ENV || 'development';
    global.__LIVE_CHAT_ADMIN_NAME__ = process.env.LIVE_CHAT_ADMIN_NAME || '';

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // configure webpack middleware
        const webpack = require('webpack');
        const dev = require('webpack-dev-middleware');
        const hot = require('webpack-hot-middleware');
        const webpackConfig = require('../webpack.config.js');
        const compiler = webpack(webpackConfig);

        app.use(
            dev(compiler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {
                    colors: true,
                    hash: false,
                    timings: true,
                    chunks: false,
                    chunkModules: false,
                    modules: false,
                },
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000,
                },
            })
        );
        app.use(hot(compiler));
    }

    // configure express
    app.use(compression());
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(require('./redirects'));
    app.use(express.static('dist'));
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // logging
    // app.use(require('./logging')); //morgan
    // require('express-debug')(app, {});

    // global vars
    app.use((req, res, next) => {
        res.locals.renderer = 'ejs';
        res.locals.title = '';
        res.locals.metaDesc = '';
        res.locals.auth = req.isAuthenticated();
        res.locals.activeClass = '';
        next();
    });

    // Sessions and auth
    app.set('trust proxy', 1);
    const sessionStore = require('../config/sessions-config')(app);

    require('../config/passport-config');
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    // auth routes
    app.use(require(__dirname + '/routes/auth'));

    // api routes
    app.use('/api', require(__dirname + '/routes/api'));

    // authenticate admin routes
    const isAuth = (req, res, next) => {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
            next();
            return;
        }
        res.redirect('/login');
    };

    // admin routes
    app.use('/admin', isAuth, require(__dirname + '/routes/admin'));

    // react routes (all other http)
    app.get('*', require('../app/js/index').serverMiddleware);

    // socket.io
    require('./routes/liveChat').socketio(http, sessionStore);

    // auto admin login
    const {
        liveChat: { autoLogin = 'false' },
    } = config;
    if (autoLogin.toLowerCase() === 'true') {
        const { startAutologin } = require(__dirname +
            '/controllers/liveChatAutoLogin');
        startAutologin();
    }

    // 404 handling
    app.use(function (req, res, next) {
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

        next();
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                status: 500,
                stack: err.stack,
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
            console.error(
                'Unhandled Rejection at: Promise ',
                p,
                ' reason: ',
                reason
            );
        }
    });

    app.set('port', process.env.PORT || 3100);

    const startServer = function () {
        const server = http.listen(app.get('port'), function () {
            console.log(
                'Express server listening on port ' + server.address().port
            );
            console.log('Node Environment: ' + process.env.NODE_ENV);
        });
    };

    if (process.env.DATABASE_SYNC === 'true') {
        models.sequelize
            .sync({
                // force: false,
                logging: function (str) {
                    console.log(str);
                },
            })
            .then(addSessionTable)
            .then(startServer);
    } else startServer();
};
