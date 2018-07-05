'use strict';

var express = require('express');
var _ = require('lodash');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var multer  = require('multer');

var managePortfolio = require('../controllers/managePortfolio.js');
var liveChat = require('../controllers/liveChat.js');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/images/portfolio')
    },
    filename: function (req, file, cb) {
        console.dir(file);
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            const fp = path.parse(file.originalname);
            cb(null, fp.name.replace(/\s/ig, '') + '-' + raw.toString('hex')  + fp.ext);
        })
    }
});
var cpUpload = multer({ storage: storage })
    .fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'image_mobile', maxCount: 1 },
        { name: 'gallery_images', maxCount: 10 }
    ]);

// check logged in user has sufficient privileges
router.use((req, res, next) => {
    if (req.user.useraccess === 3) {
        next();
        return;
    }
    // TODO: test status not sending to error view
    res.status(404);
    res.render('error', { url: req.url, status: 404});
});

//routes
router.get('/portfolio', managePortfolio.getPortfolio );

router.route('/portfolio/add')
    .get(managePortfolio.addPortfolioItem)
    .post(cpUpload, managePortfolio.handlePortfolioSubmit);

router.route('/portfolio/:id')
    .get(managePortfolio.editPortfolioItem)
    .post(cpUpload, managePortfolio.handlePortfolioItemSubmit);

router.get('/portfolio/delete/:id', managePortfolio.deletePortfolioItem);

router.get('/live-chat-manager', liveChat.chatManager);

module.exports = router;