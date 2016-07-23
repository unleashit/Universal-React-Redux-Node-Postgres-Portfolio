'use strict';

var express = require("express");
var _ = require("lodash");
var uuid = require("node-uuid");
var bodyParser = require('body-parser');

//var rooms = require("./data/rooms.json");
//var messages = require("./data/messages.json");
//var users = require("./data/users.json");
var portfolio = require('../controllers/portfolioAPI.js');

var router = express.Router();
module.exports = router;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

router.use(allowCrossDomain);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/portfolio', portfolio.getPortfolioItems);

// router.route('/rooms/:roomId/messages')
//     .get(chat.getMessagesByRoom)
//     .post(chat.postMessage)
//     .delete(chat.deleteMessages);