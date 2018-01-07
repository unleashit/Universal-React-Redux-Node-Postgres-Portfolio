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

                var count = 14;
                var data = [];
                u = u.map( (obj) => obj.dataValues.id );

                function makeId() {
                    var i = Math.floor(Math.random() * u.length);
                    return u[i];
                }
                function makepara() {
                    var num = Math.ceil(Math.random() * 8),
                        body = '';
                    for (var i=0; i<num; i++) {
                        body += '<p>' + chance.paragraph() + '</p>\n';
                    }
                    return body;
                }

                function generateBlog() {
                    return {
                        title: chance.sentence(),
                        body: makepara(),
                        category: chance.word(),
                        image: 'http://placehold.it/1000/120',
                        publish_date: new Date(),
                        published: true,
                        UserId: makeId(),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };
                }

                for (var i = 0; i < count; i++) {
                    data.push(generateBlog());
                }

                return queryInterface.bulkInsert('Blogs', data);
            })
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Blogs', null, {});
    }
};


