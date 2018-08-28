var session = require('express-session');
var config = require('./APPconfig');

var options = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    checkExpirationInterval: 3600000,
    expiration: 432000000
};

var sessionStore;

module.exports = function(app) {
    if (options.dialect === 'mysql') {
        var MySQLStore = require('express-mysql-session')(session);
        sessionStore = new MySQLStore(options);
    } else if (options.dialect === 'postgres') {
        var pg = require('pg');
        var pgSession = require('connect-pg-simple')(session);
        var conString =
            'postgresql://' +
            options.user +
            ':' +
            options.password +
            '@' +
            options.host +
            '/' +
            options.database;

        sessionStore = new pgSession({
            pg: pg, // Use global pg-module
            conString,
            tableName: 'session' // Optionally use another table-name than the default "session"
        });
    } else {
        throw new Error(`This script only supports mysql or postgres sessions out of the box.
            If you want to use another DB, please add the appropriate
            session connector and modify sessions-config.js`);
    }

    app.use(
        session({
            store: sessionStore,
            key: config.__SESSION_KEY__,
            secret: config.__SESSION_SECRET__,
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 5 * 24 * 60 * 60 * 1000 } // 5 days
        })
    );

    return sessionStore;
};
