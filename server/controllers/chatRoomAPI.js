var models = require('../models/index.js');

exports.getRooms = function (req, res) {
    models.Room
        .findAll({limit: 100})
        .then((rooms) =>{
            res.json(rooms);
        })
};

exports.getMessagesByRoom = function (req, res, next) {
    models.Message
        .findAll({
            include: [models.Room, models.User],
            where: {
                RoomId: req.params.roomId
            },
            limit: 100
        })
        .then(function (msgs) {

            if (!msgs.length) {
                res.json({
                    messages: [],
                    room: []
                });

            }
            var messages = msgs.map(msg => {
                return {
                    username: msg.User.dataValues.email,
                    text: msg.dataValues.title
                }
            });

            var data = {
                messages: messages,
                room: msgs[0].Room.dataValues
            };

            res.json(data);

        })
        .catch(function(err){
            console.log(err);
        });
};

    // var msgs = messages
    //     .filter((msg) => msg.roomId === roomId)
    //     .map(msg => {
    //         var user = _.find(users, u => u.id === msg.userId);
    //         return {
    //             username: user.name,
    //             text: msg.text
    //         }
    //     });
    //
    // var room = _.find(rooms, function (val) {
    //     return val.id === roomId;
    // });
    //
    // var data = {
    //     messages: msgs,
    //     room: room
    // };
    //
    // res.json(data);
//};

exports.postMessage = function (req, res) {

    models.Message
        .create({
            title: req.body.text,
            RoomId: req.params.roomId,
            UserId: req.user.id
        })
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(err) {
            console.log('Problem posting message to DB: ' + err);
    });
};
    // var roomId = req.params.roomId;
    //
    // var room = _.find(rooms, function (val) {
    //     return val.id === roomId;
    // });
    //
    // // var msgs = messages.filter((msg) => {
    // //     return msg.roomId === roomId;
    // // });
    //
    // var message = {
    //     text: req.body.text,
    //     roomId: roomId,
    //     userId: req.user.id,
    //     id: uuid.v4()
    // };
    //
    // messages.push(message);
    //
    // res.sendStatus(200);
//};

exports.deleteMessages = function (req, res) {
    models.Message
        .destroy({where: {RoomId: req.params.roomId}})
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.log('there was an error: ' + err.message)
        });
};