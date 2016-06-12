'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('tasks', 'title', {
      type: Sequelize.BLOB
    })
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.changeColumn('tasks', 'title', {
          type: Sequelize.TEXT
      })
  }
};
