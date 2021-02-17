'use strict';

module.exports = function (sequelize, DataTypes) {
    var Ban = sequelize.define('Ban', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    });

    return Ban;
};
