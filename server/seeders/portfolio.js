const path = require('path');
const models = require('../models');
const data = require('./seedData/portfolios');

const newData = data.map((item) => {
    return Object.assign({}, item, {
        createdAt: new Date(),
        updatedAt: new Date(),
    });
});

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Portfolios', newData);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Portfolios', null, {});
    },
};
