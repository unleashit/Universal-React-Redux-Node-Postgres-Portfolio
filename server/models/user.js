"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    useraccess: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
    // github_userID: DataTypes.INTEGER,
    // github_userName: DataTypes.STRING,
    // github_email: DataTypes.STRING,
    // github_repos: DataTypes.STRING,
    // github_access_token: DataTypes.STRING,
    // github_refresh_token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Portfolio);
      }
    }
  });

  return User;
};