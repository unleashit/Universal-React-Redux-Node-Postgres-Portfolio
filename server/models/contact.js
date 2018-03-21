"use strict";

module.exports = function(sequelize, DataTypes) {

  var Contact = sequelize.define("Contact", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING,
    message: DataTypes.TEXT
  });

  return Contact;
};