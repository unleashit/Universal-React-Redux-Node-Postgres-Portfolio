'use strict';

var express = require("express");
var _ = require("lodash");
var uuid = require("node-uuid");
var bodyParser = require('body-parser');

//var rooms = require("./data/rooms.json");
//var messages = require("./data/messages.json");
//var users = require("./data/users.json");
var chat = require('../controllers/chatRoomAPI.js');

var router = express.Router();
module.exports = router;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/rooms', chat.getRooms);

router.route('/rooms/:roomId/messages')
    .get(chat.getMessagesByRoom)
    .post(chat.postMessage)
    .delete(chat.deleteMessages);