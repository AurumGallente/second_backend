var models = require('../models');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "exerciseModel"});
var acl = require('../util/acl.js');

var router = function (app) {
    app.get('/exercise/', acl, function (req, res, next) {
        log.info({query: req.query}, 'request exercises with this query');
        var page = (req.query.page) ? parseInt(req.query.page) - 1 : 0;
        var perPage = (req.query.perPage && req.query.perPage <= 20) ? parseInt(req.query.perPage) : 5;
        models.Exercise.findAndCountAll({offset: page * perPage, limit: perPage}).then(function (exercises) {
            res.json(exercises);
        });
    });
    app.get('/exercise/:id', acl, function (req, res, next) {
        var id = req.params.id;
        models.Exercise.find({where: {id: id}}).then(function (exercise) {
            if (exercise == null) {
                res.status(404);
                res.send();
            } else {
                res.json(exercise);
            }
        });
    });
    app.post('/exercise/', acl, function (req, res) {
        models.Exercise.create({
            name: req.param('name'),
            description: req.param('description')            
        }, {isNewRecord: true}).then(function (result) {
            log.info({}, 'exercise added');
            res.status(200);
            res.send(result.dataValues);
        }).error(function (err) {
            log.warn({err: err}, 'error: try adding exercise');
            //console.log(err.message);
            res.status(400);
            res.send(err.message);
        });
    });
    app.put('/exercise/:id', acl, function (req, res) {
        var id = req.params.id;
        //console.log(req.params);
        models.Exercise.update({
            name: req.param('name'),
            description: req.param('description')            
        },
        {
            where: {id: id}
        })
                .then(function (result) {
                    res.status(200);
                    res.send(result.dataValues);
                    log.info({}, 'exercise updaded');
                })
                .error(function (err) {
                    log.warn({err: err}, 'error: try update exericise id:' + id);
                    res.status(400);
                    res.send(err.message);
                });
        ;
    });
    app.delete('/exercise/:id', acl, function (req, res) {
        var id = req.params.id;
        models.Exercise.destroy({where: {id: id}})
                .then(function () {
                    res.status(200);
                    res.send();
                })
                .error(function (err) {
                    res.status(400);
                    res.send(err);
                });
        ;
    });
};
module.exports = router;