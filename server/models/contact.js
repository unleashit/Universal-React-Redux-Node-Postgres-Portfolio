"use strict";

module.exports = function(sequelize, DataTypes) {

  var Contact = sequelize.define("Contact", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    message: DataTypes.TEXT
  });

  return Contact;
};