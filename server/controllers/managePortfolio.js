var models = require('../models/index.js');

var portfolioTags = ['Joomla', 'Drupal', 'Wordpress', 'Angular', 'React', 'jQuery', 'Javascript', 'Html', 'CSS', 'Design/UX', 'Frontend', 'Backend', 'PHP', 'MySql', 'Ecommerce', 'AWS', 'Devops', 'Other'];

//var bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({ extended: true }));

var _ = require('lodash');

exports.getPortfolio = function(req, res) {
    models.Portfolio
        .findAll({limit: 100})
        .then((items) =>{
            res.render("portfolio", {
                title: 'Manage Portfolio',
                items: items,
                activeClass: 'manage-portfolio'
            });
        })
};

exports.addPortfolioItem = function(req, res) {
    models.User
        .findAll()
        .then((users) => {

            users = users.map(user => {
                return { id: user.dataValues.id, email: user.dataValues.email }
            });

            res.render("portfolio-add", {
                title: "Add Portfolio Item",
                users: users,
                tags: portfolioTags,
                activeClass: 'manage-portfolio'
            });
        })
};

exports.handlePortfolioSubmit = function(req, res) {
    var main_image = (typeof req.files['main_image'] !== 'undefined') ? req.files['main_image'][0].filename : null;
    var tags = (typeof req.body.tags !== 'undefined') ? req.body.tags.toString() : null;

    var gallery_images;
    if (typeof req.files.gallery_images !== 'undefined') {
        gallery_images = req.files.gallery_images.map(img => img.filename).join('|');
    } else {
        gallery_images = null;
    }

    models.Portfolio
        .create({
            title: req.body.title || null,
            description: req.body.description || null,
            description_short: req.body.description_short || null,
            tags: tags,
            main_image: main_image,
            gallery: gallery_images,
            link: req.body.link || null,
            UserId: req.body.user
        })
        .then(() => {
            res.redirect(req.baseUrl + '/portfolio');
        })
        .catch(function(err) {
            console.log('couldn\'t add portfolio item: ' + err);
        })
};

exports.editPortfolioItem = function(req, res) {
    models.Portfolio
        .findById(req.params.id)
        .then(function(item) {
            res.render('portfolio-edit', {
                title: 'Edit portfolio item',
                item: item.dataValues,
                tags: portfolioTags,
                activeClass: 'manage-portfolio'
            });
        })
};

exports.handlePortfolioItemSubmit = function(req, res) {

    var properties = {
        title: req.body.title,
        description: req.body.description,
        description_short: req.body.description_short,
        link: req.body.link
    };

    if (typeof req.files.main_image !== 'undefined') {
        properties.main_image = req.files['main_image'][0].filename;
    }

    if (typeof req.files.gallery_images !== 'undefined') {
        properties.gallery = req.files.gallery_images.map(img => img.filename).join('|');
    }

    properties.tags = (typeof req.body.tags !== 'undefined') ? req.body.tags.toString() : null;

    models.Portfolio
        .update(properties, {
            where: {
                id: req.params.id
            }
        })
        .then(function(room) {
            if (room) {
                res.redirect(req.baseUrl + '/portfolio');
            } else {
                throw new Error("Update failed.")
            }
        })
        .catch(function(err) {
            console.log('there was an error: ' + err.message);
        });
};

exports.deletePortfolioItem = function(req, res) {
    models.Portfolio
        .destroy({where: {id: req.params.id}})
        .then(function () {
            res.redirect(req.baseUrl + '/portfolio');
        })
        .catch(function (err) {
            console.log('there was an error: ' + err.message)
        });

};
