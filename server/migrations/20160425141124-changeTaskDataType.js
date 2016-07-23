'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('portfolio', 'description', {
      type: Sequelize.TEXT('medium')
    })
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.changeColumn('portfolio', 'description', {
          type: Sequelize.BLOB
      })
  }
};
