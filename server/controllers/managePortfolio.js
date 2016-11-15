var models = require('../models/index.js');
var sequelize = require('sequelize');

var portfolioTags = ['Joomla', 'Drupal', 'Wordpress', 'Angular', 'React', 'jQuery', 'Javascript', 'Html', 'CSS', 'Design/UX', 'Frontend', 'Backend', 'PHP', 'MySql', 'Ecommerce', 'AWS', 'Devops', 'Other'];

//var bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({ extended: true }));

var _ = require('lodash');

exports.getPortfolio = function(req, res) {
    models.Portfolio
        .findAll({
            limit: 100,
            order: '`sort` ASC'
        })
        .then((items) =>{
            res.render("portfolio", {
                title: 'Manage Portfolio',
                items: items,
                activeClass: 'manage-portfolio',
                auth: req.isAuthenticated()
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
                activeClass: 'manage-portfolio',
                auth: req.isAuthenticated()
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

    // if no url_slug provided, make one from title
    var url_slug = !req.body.url_slug ?
        req.body.title
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9\s]/gi, '')
            .split(' ')
            .join('-') :
        req.body.url_slug;

    models.Portfolio
        .max('sort')
        .then((maxSort) => {
            models.Portfolio.create({
                title: req.body.title || null,
                description: req.body.description || null,
                description_short: req.body.description_short || null,
                tags: tags,
                main_image: main_image,
                image_mobile: main_image || null,
                gallery: gallery_images,
                link: req.body.link || null,
                url_slug: url_slug || null,
                UserId: req.body.user,
                sort: maxSort +1 || 0
            })
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
                activeClass: 'manage-portfolio',
                auth: req.isAuthenticated()
            });
        })
};

exports.handlePortfolioItemSubmit = function(req, res) {

    var properties = {
        title: req.body.title,
        description: req.body.description,
        description_short: req.body.description_short,
        link: req.body.link,
        url_slug: req.body.url_slug,
        sort: req.body.sort
    };

    if (typeof req.files.main_image !== 'undefined') {
        properties.main_image = req.files['main_image'][0].filename;
    }

    if (typeof req.files.image_mobile !== 'undefined') {
        properties.image_mobile = req.files['image_mobile'][0].filename;
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
