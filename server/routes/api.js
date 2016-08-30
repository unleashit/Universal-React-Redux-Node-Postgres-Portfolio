'use strict';

var express = require("express");
var _ = require("lodash");
var uuid = require("node-uuid");
var bodyParser = require('body-parser');

var portfolio = require('../controllers/portfolioAPI.js');
var contactForm = require('../controllers/contactForm.js');

var router = express.Router();

// CORS middleware for testing purposes
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

router.use(allowCrossDomain);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/portfolio', portfolio.getPortfolioItems);
router.get('/portfolio/:slug', portfolio.getPortfolioItem);
router.post('/contact', contactForm.handleContactSubmit);

module.exports = router;