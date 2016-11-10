"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("LiveChat", {
        socketId: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        name: DataTypes.TEXT,
        connected: DataTypes.BOOLEAN,
        messages: DataTypes.TEXT,
        date: DataTypes.TEXT
    });
};