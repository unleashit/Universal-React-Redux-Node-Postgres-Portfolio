var models = require('../models/index.js');

exports.getPortfolioItems = function (req, res) {
    models.Portfolio
        .findAll({
            limit: 25,
            attributes: ['id', 'title', 'main_image', 'url_slug', 'description_short', 'sort']
        })
        .then((items) => {
            res.json(items);
        })
        .catch((error) => {
            console.log(error);
        })
};

exports.getPortfolioItem = function (req, res) {
    models.Portfolio
        .findOne({
            attributes: [
                'id', 'title', 'description', 'description_short', 'tags', 'main_image',
                'image_mobile', 'gallery', 'link', 'url_slug', 'sort'
            ],
            where: {
                url_slug: req.params.slug
            }
        })
        .then((mainItem) => {
            if (!mainItem) res.json({error: '404'});

            models.Portfolio.findAll({
                    attributes: ['id', 'url_slug', 'sort'],
                    where:
                        {
                        sort: {$gt: mainItem.dataValues.sort}
                    },
                    order: [['sort', 'ASC']],
                    limit: 1
            })
            .then((next) => {
                models.Portfolio.findAll({
                        attributes: ['id', 'url_slug', 'sort'],
                        where: {
                            sort: {$lt: mainItem.dataValues.sort}
                        },
                        order: [['sort', 'DESC']],
                        limit: 1
                })
                .then((prev) => {
                    mainItem.dataValues.next = next.length === 0 ? null : next[0].dataValues.url_slug;
                    mainItem.dataValues.prev = prev.length === 0 ? null : prev[0].dataValues.url_slug;
                    res.json(mainItem);
                })

            })

        })
        .catch((error) => {
            console.log(error);
            res.json({error: error});
        })
};