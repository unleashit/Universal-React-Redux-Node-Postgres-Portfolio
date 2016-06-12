'use strict';

var express = require('express');
var app = express();
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');

var models = require("./models");
//var rooms = require('./data/rooms.json');
var createuser = require('./controllers/createUser');

app.set("views", "./server/views");
app.set("view engine", "ejs");

// serve static assets
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
//app.use(express.static('node_modules/jquery/dist'));

//logging
// app.use(require('./logging'));
// require('express-debug')(app, {});

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

//routes
app.use((req, res, next) => {
    console.log('client connected');
    next();
});
app.use(require('./auth'));

app.get('/signup', (req, res) => {
    res.render("signup", { title: 'Signup', error: req.flash('error') });
});

app.post('/signup', createuser.signup);

//authenticated routes below here
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
        return;
    }
    res.redirect('/login');
});

app.get('/', (req, res) => {
    res.render("home", { title: 'Home', activeClass: 'home' });
});

var apiRouter = require('./routes/api');
app.use("/api", apiRouter);

var adminRouter = require('./routes/admin');
app.use("/admin", adminRouter);

app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
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

//var debug = require('debug')('Chat_App');
app.set('port', process.env.PORT || 3000);

models.sequelize.sync({
    force: true,
    logging: function(str) {console.log(str);}
    })
    .then(function () {
        var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
});