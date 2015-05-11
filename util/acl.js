var decoded = require('./decodedUser.js');
var aclRules = require('./aclRules.js');

module.exports = function acl(req, res, next) {
    if (req.method !== "OPTIONS") {
        var path = req.route.path;
        var method = req.method;
        var user = decoded(req.headers.authorization);
        //console.log(aclRules[user.role][path][method]);
        if (!(aclRules[user.role] && aclRules[user.role][path] && aclRules[user.role][path][method])) {
            res.sendStatus(403);
            return;
        }
    }
    next();
};