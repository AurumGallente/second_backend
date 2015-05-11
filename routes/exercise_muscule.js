var models = require('../models');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "muscule_exerciseModel"});
var acl = require('../util/acl.js');
var bodyParser = require('body-parser');
var router = function (app) {
    app.get('/muscule/:musculeId/exercise/', acl, function (req, res, next) {
        var musculeId = parseInt(req.params.musculeId);
        models.Muscule.find({where: {id: musculeId}, include: [{model: models.Exercise}]})
                .then(function (result) {
                    cleanResult = {};
                    if (result && result.Exercises) {
                        cleanResult = result.Exercises.map(function (exercise) {
                            delete exercise.dataValues['muscule_exercise'];
                            return exercise.dataValues;
                        });
                    }
                    res.send(cleanResult);
                })
                .error(function (err) {
                    res.status(400);
                    res.send(err.message);
                });
    });
    app.post('/muscule/:musculeId/exercise/', acl, function (req, res, next) {
        var musculeId = parseInt(req.params.musculeId);        
        var exerciseId = parseInt(req.param('exerciseId'));        
        models.Muscule.find({where: {id: musculeId}})
                .then(function (result) {
                    result.addExercise(exerciseId)
                    .then(function(){
                        res.sendStatus(200);
                    })
                    .error(function(err){
                        res.status(400);
                        res.send(err.message);
                    });
                }).error(function(err){
                    res.status(400);
                    res.send(err.message);
                });
    });
    app.get('/exercise/:exerciseId/muscule/', acl, function (req, res, next) {
        var exerciseId = parseInt(req.params.exerciseId);
        models.Exercise.find({where: {id: exerciseId}, include: [{model: models.Muscule}]})
                .then(function (result) {
                    cleanResult = {};
                    if (result && result.Muscules) {
                        cleanResult = result.Muscules.map(function (muscule) {
                            delete muscule.dataValues['muscule_exercise'];
                            return muscule.dataValues;
                        });
                    }
                    res.send(cleanResult);
                })
                .error(function (err) {
                    res.status(400);
                    res.send(err.message);
                });
    });
};
module.exports = router;