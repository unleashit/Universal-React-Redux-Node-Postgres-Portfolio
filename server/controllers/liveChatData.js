var models = require('../models/index.js');
var sequelize = require('sequelize');
var path = require('path');
var config = require(path.join(__dirname, '/../config/appConfig'));

// var users = {
//     wef14: {
//         id: 'user1',
//         name: 'fred',
//         connected: true,
//         messages: [
//             {
//                 id: 'user1',
//                 room: 'wef14',
//                 name: 'fred',
//                 message: 'test message',
//                 date: '2342423432423'
//             },
//                         {
//                 id: 'admin',
//                 room: 'wef14',
//                 name: 'john doe',
//                 message: 'lsfas fasfasfasdfa sfasfsdf ',
//                 date: '234242343286'
//             }
//         ]
//     },
//     kjjk33: {
//         id: 'kjjk33',
//         name: 'Tom Bombodil',
//         connected: false,
//         messages: [
//             {
//                 id: 'kjjk33',
//                 room: 'kjjk33',
//                 name: 'fred',
//                 message: 'test message',
//                 date: '2342423432423'
//             },
//                         {
//                 id: 'wef14',
//                 room: 'wef14',
//                 name: 'fred',
//                 message: 'test message',
//                 date: '2342423432423'
//             },
//                         {
//                 id: 'wef14',
//                 room: 'wef14',
//                 name: 'fred',
//                 message: 'test message',
//                 date: '2342423432423'
//             }
//         ]
//     },
//     k3j3ll2: {
//         id: 'k3j3ll2',
//         name: 'Maggie the Cat',
//         connected: false,
//         messages: [
//             {
//                 id: 'k3j3ll2',
//                 room: 'k3j3ll2',
//                 name: 'Maggie the Cat',
//                 message: 'Moo',
//                 date: '454252242342'
//             }
//         ]
//     },
// };

function insertChatRecords(users) {
    return models.LiveChat.bulkCreate(users,
        {
            updateOnDuplicate: [
                'name', 'connected', 'messages', 'date'
            ]
        });
}

function formatUsers(users) {
    return Object.keys(users).map(u => {
        return {
            socketId: users[u].id,
            name: users[u].name,
            connected: users[u].connected,
            messages: JSON.stringify(users[u].messages),
            date: users[u].date
        }
    })
}

function parseUsers(users) {

}

exports.filterOld = function (users, chat) {
    let now = Date.now(),
        purged = [];

    // delete user if purge interval has passed
    Object.keys(users).forEach(u => {
        if (now - users[u].date > config.liveChat.purgeInterval) {
            purged.push(users[u]);
            delete users[u];

            // send the disconnect to inform timed out client and admin
            chat.in(u).emit('disconnect', u);
        }
    });

    if (purged.length) {
        console.log("Users purged from RAM:");
        console.dir(purged);
    }

    return users;
};

exports.save = function(users) {
    return insertChatRecords(formatUsers(users));
};

exports.queryUser = function (id) {
    return models.LiveChat.findOne({
        where: {socketId: id}
    })
    .then(data => {
        if (data) {
            return {
                id: data.socketId,
                name: data.name,
                connected: true,
                messages: JSON.parse(data.messages),
                date: Date.now()
            };
        } else return null;
    })
    .catch(err => {
        console.log('problem with user query');
        throw new Error(err);
    })
};

exports.queryUsers = function (users, offset) {
    return models.LiveChat.findAll({
        where: {
            socketId: {
                $notIn: Object.keys(users).length ? Object.keys(users) : ['']
            }
        },
        limit: 20,
        offset: offset,
        order: [['updatedAt', 'DESC']]
    })
    .then(archivedUsers => {
        let usersObj = {};

        archivedUsers.map(u => u.dataValues)
            .forEach(u => {
                u = {
                    id: u.socketId,
                    name: u.name,
                    connected: false,
                    messages: JSON.parse(u.messages),
                    date: u.date
                };
                usersObj[u.id] = u;
            });

        return usersObj;
    })
    .catch(err => {
        throw new Error(err);
    });
};


