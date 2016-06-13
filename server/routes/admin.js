'use strict';

var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');
var path = require('path');
var crypto = require('crypto');

var managePortfolio = require('../controllers/managePortfolio.js');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/images/portfolio')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        })
    }
});
var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'gallery_images', maxCount: 10 }]);

// check logged in user has sufficient privileges
router.use((req, res, next) => {
    if (req.user.useraccess === 3) {
        next();
        return;
    }
    res.status(403);
    res.render('404', { url: req.url });
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

module.exports = router;