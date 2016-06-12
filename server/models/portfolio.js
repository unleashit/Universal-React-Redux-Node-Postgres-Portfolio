"use strict";

module.exports = function(sequelize, DataTypes) {
    var Portfolio = sequelize.define("Portfolio", {
        title: DataTypes.TEXT,
        description: DataTypes.BLOB,
        description_short: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        main_image: DataTypes.STRING,
        gallery: DataTypes.BLOB,
        link: DataTypes.STRING
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