"use strict";

module.exports = function(sequelize, DataTypes) {
    var Portfolio = sequelize.define("Portfolio", {
        title: DataTypes.STRING,
        description: DataTypes.BLOB,
        description_short: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        main_image: DataTypes.STRING,
        gallery: DataTypes.TEXT('medium'),
        link: DataTypes.STRING,
        sort: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: function(models) {
                Portfolio.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Portfolio;
};