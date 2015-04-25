var models = require('../models');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "userModel"});
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var bodyParser = require('body-parser');
var jwtSecret = require('../variables/jwt.js');

//------------- util functins
function createHash() {
    var length = 10;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
;

//------------- END util functins



var router = function (app, https) {
    app.post('user/create', function (req, res) {
        if (!req.secure) {
            res.status(403);
            res.send('request should be secure');
        } else {
            if (!req.param('user') || !req.param('password') || req.param('password').toString().length < 8) {
                res.status(400);
                res.send('invalid credentials');
            } else {
                var hash = createHash();
                models.User.create({
                    username: req.param('username'),
                    hash: hash,
                    password: passwordHash.generate(req.param('password') + hash)
                })
                        .then(function () {
                            log.info({}, 'user added');
                            res.sendStatus(200);
                        })
                        .error(function (err) {
                            log.warn({err: err}, 'error: fail to create user');
                            res.status(400);
                            res.send(err);
                        });
            }
        }
    });
    app.get('/user/', function (req, res) {
        log.info({query: req.query}, 'request users with this query');
        var page = (req.query.page) ? parseInt(req.query.page) - 1 : 0;
        var perPage = (req.query.perPage && req.query.perPage <= 20) ? parseInt(req.query.perPage) : 5;
        models.User.findAndCountAll({attributes: ['id', 'username', 'createdAt'], offset: page * perPage, limit: perPage}).then(function (users) {
            res.json(users);
        });
    });
    app.post('/login', function (req, res) {
        if (!req.secure) {
            res.status(403);
            res.send('request should be secure');
        } else {
            var body = req.body;
            if (!body.username || !body.password) {
                res.status(400).end('provide username and password');
            } else {
                models.User.find({where: {username: body.username}})
                        .then(function (user) {
                            if (passwordHash.verify((req.param('password') + user.hash), user.password)) {
                                var publicUserData = {
                                    username: user.username,
                                    role: user.role};
                                var token = jwt.sign(publicUserData, jwtSecret);
                                res.send({token: token, user: {username: user.username}});
                            } else {
                                res.status(400).end('provide valid username and password');
                            }
                        })
                        .error(function (err) {
                            res.status(500);
                            res.send();
                            log.warn({err: err}, 'error: fail to login user');
                        });
            }
        }
        ;
    });
//app.get('/me', function(req, res){
//    res.send({username: user.username});
//});    
};
module.exports = router;