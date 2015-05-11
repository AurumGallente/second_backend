var jwt = require('jsonwebtoken');
var jwtSecret = require('../variables/jwt.js');
var guest = {role: "guest"};
module.exports = function (token) {    
        return token ? jwt.verify(token.toString().substring(7), jwtSecret) : guest ;        
};