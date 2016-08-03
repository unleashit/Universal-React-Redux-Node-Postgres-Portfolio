var models = require('../models/index.js');

exports.getPortfolioItems = function(req, res) {
    models.Portfolio
        .findAll({
            limit: 25,
            attributes: ['id', 'title', 'main_image', 'url_slug', 'description_short']
        })
        .then((items) =>{
            res.json(items);
        })
        .catch((error) => {
            console.log(error);
        })
};

exports.getPortfolioItem = function(req, res) {
    models.Portfolio
        .findOne({where: {
            url_slug: req.params.slug
        }})
        .then((mainItem) => {
            if (!mainItem) res.json({error: '404'});
            models.Portfolio.findOne({where: {
               sort: mainItem.dataValues.sort + 1
            }})
            .then((next) => {
                //if (!next) { next.dataValues.url_slug = null }
                models.Portfolio.findOne({where: {
                    sort: mainItem.dataValues.sort - 1
                }})

                .then((prev) => {
                    //if (!prev) { prev.dataValues.url_slug = null }

                    mainItem.dataValues.next = next === null ? null : next.dataValues.url_slug;
                    mainItem.dataValues.prev = prev === null ? null : prev.dataValues.url_slug;
                    res.json(mainItem);
                })

            })

        })
        .catch((error) => {
            console.log(error);
            res.json({error: error});
        })
};

// exports.getMessagesByRoom = function (req, res, next) {
//     models.Message
//         .findAll({
//             include: [models.Room, models.User],
//             where: {
//                 RoomId: req.params.roomId
//             },
//             limit: 100
//         })
//         .then(function (msgs) {
//
//             if (!msgs.length) {
//                 res.json({
//                     messages: [],
//                     room: []
//                 });
//
//             }
//             var messages = msgs.map(msg => {
//                 return {
//                     username: msg.User.dataValues.email,
//                     text: msg.dataValues.title
//                 }
//             });
//
//             var data = {
//                 messages: messages,
//                 room: msgs[0].Room.dataValues
//             };
//
//             res.json(data);
//
//         })
//         .catch(function(err){
//             console.log(err);
//         });
// };

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

// exports.postMessage = function (req, res) {
//
//     models.Message
//         .create({
//             title: req.body.text,
//             RoomId: req.params.roomId,
//             UserId: req.user.id
//         })
//         .then(function(){
//             res.sendStatus(200);
//         })
//         .catch(function(err) {
//             console.log('Problem posting message to DB: ' + err);
//     });
// };
//     // var roomId = req.params.roomId;
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

// exports.deleteMessages = function (req, res) {
//     models.Message
//         .destroy({where: {RoomId: req.params.roomId}})
//         .then(function () {
//             res.sendStatus(200);
//         })
//         .catch(function (err) {
//             console.log('there was an error: ' + err.message)
//         });
// };