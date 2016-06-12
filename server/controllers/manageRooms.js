var models = require('../models/index.js');

//var bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({ extended: true }));
var _ = require('lodash');


exports.getRooms = function(req, res) {
    models.Room
        .findAll({limit: 100})
        .then((rooms) =>{
            res.render("rooms", {
                title: 'Manage Rooms',
                rooms: rooms,
                activeClass: 'rooms'
            });
        })
};

exports.addRoom = function(req, res) {
    res.render("add-room", {
        title: "Add Room",
        activeClass: 'rooms'
    });
};

exports.addRoomPost = function(req, res) {
    models.Room
        .create({
            name: req.body.name
        })
        .then((rooms) => {
            res.redirect(req.baseUrl + '/rooms');
        })
        .catch(function(err) {
            console.log('couldn\'t add room: ' + err);
        })
};

exports.editRoom = function(req, res) {
    models.Room
        .findById(req.params.id)
        .then(function(room) {
            res.render('edit-room', {
                title: 'Edit room',
                room: room,
                activeClass: 'rooms'
            });
        })
};

exports.editRoomPost = function(req, res) {
    models.Room
        .update({name: req.body.name},
            {where: {id: req.params.id}
        })
        .then(function(room){
            if (room) {
                res.redirect(req.baseUrl + '/rooms');
            } else {
                throw new Error("Update failed.")
            }
        })
        .catch(function(err) {
            console.log('there was an error: ' + err.message);
        });
};

exports.deleteRoom = function(req, res) {
    models.Room
        .destroy({where: {id: req.params.id}})
        .then(function () {
            res.redirect(req.baseUrl + '/rooms');
        })
        .catch(function (err) {
            console.log('there was an error: ' + err.message)
        });

};
