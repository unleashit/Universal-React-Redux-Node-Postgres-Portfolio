var Chance = require('chance');
var chance = new Chance;
var path  = require('path');
var models  = require('../models');

module.exports = {
    up: function (queryInterface, Sequelize) {

        return Promise
            .resolve()
            .then( () => models.User.findAll() )
            .then(function(u) {

                var count = 15;
                var data = [];
                u = u.map( (obj) => obj.dataValues.id );

                function makeId() {
                    var i = Math.floor(Math.random() * u.length);
                    return u[i];
                }

                function generateUser() {
                    return {
                        title: chance.sentence(),
                        UserId: makeId(),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };
                }

                for (var i = 0; i < count; i++) {
                    data.push(generateUser());
                }

                return queryInterface.bulkInsert('Tasks', data);
            })
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Tasks', null, {});
    }
};


