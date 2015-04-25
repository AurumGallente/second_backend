var models = require('../models');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "musculeModel"});


var router = function (app) {
    app.get('/muscule/', function (req, res) {
        log.info({query: req.query}, 'request muscules with this query');
        var page = (req.query.page) ? parseInt(req.query.page) - 1 : 0;
        var perPage = (req.query.perPage && req.query.perPage <= 20) ? parseInt(req.query.perPage) : 5;
        models.Muscule.findAndCountAll({offset: page * perPage, limit: perPage}).then(function (muscules) {
            res.json(muscules);
        });
    });
    app.get('/muscule/:id', function (req, res) {
        var id = req.params.id;
        models.Muscule.find({where: {id: id}}).then(function (muscule) {
            if (muscule == null) {
                res.status(404);
                res.send();
            } else {
                res.json(muscule);
            }
        });
    });
    app.post('/muscule/', function (req, res) {
        models.Muscule.create({
            title: req.param('title'),
            description: req.param('description'),
            video: req.param('video')
        }).then(function () {
            log.info({}, 'muscule added');
            res.sendStatus(200);
        }).error(function (err) {
            log.warn({err: err}, 'error: try adding muscule');
            //console.log(err.message);
            res.status(400);
            res.send(err.message);
        })
                ;
    });
    app.put('/muscule/:id', function (req, res) {
        var id = req.params.id;
        //console.log(req.params);
        models.Muscule.update({
            title: req.param('title'),
            description: req.param('description'),
            video: req.param('video')
        },
        {
            where: {id: id}
        })
                .then(function () {
                    res.status(200);
                    res.send();
                    log.info({}, 'muscule updaded');
                })
                .error(function (err) {
                    log.warn({err: err}, 'error: try update muscule id:' + id);
                    res.status(400);
                    res.send(err.message);
                });
        ;
    });
    app.delete('/muscule/:id', function (req, res) {
        var id = req.params.id;
        models.Muscule.destroy({where:{id: id}})
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