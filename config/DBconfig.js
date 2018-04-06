const path = require('path');
var Sequelize = require('sequelize');

module.exports = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    charset: "utf8",
    collate: "utf8_unicode_ci",
    operatorsAliases: Sequelize.Op
}