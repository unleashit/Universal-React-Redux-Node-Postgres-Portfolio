'use strict';

var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');

var rooms = require('./data/rooms.json');
var manageRooms = require('./controllers/manageRooms.js');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;

// router.use((req, res, next) => {
//     if (req.user.useraccess === 3) {
//         next();
//         return;
//     }
//     res.status(403);
//     res.render('404', { url: req.url });
// });

router.get('/rooms', manageRooms.getRooms );

router.get('/rooms/add', manageRooms.addRoom);

router.post('/rooms/add', manageRooms.addRoomPost);

router.get('/rooms/edit/:id', manageRooms.editRoom);

router.post('/rooms/edit/:id', manageRooms.editRoomPost);

router.get('/rooms/delete/:id', manageRooms.deleteRoom);