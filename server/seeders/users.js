var Chance = require('chance');
var chance = new Chance;

var data = [];
var count = 8;

function generateUser () {
    return {
        username: chance.word(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

for (var i = 0; i < count; i++) {
    data.push(generateUser());
}

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Users', data)

  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
}
