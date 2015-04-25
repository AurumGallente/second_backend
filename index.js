var Sequelize = require("sequelize");
var https = require('https');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var corser = require('corser');
var bunyan = require('bunyan');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var jwtSecret = 'mysecret';
var sequelize = new Sequelize();
var options = require('./variables/ssl_key.js');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());


// Configure CORS (Cross-Origin Resource Sharing) Headers 
app.use(corser.create({
    methods: corser.simpleMethods.concat(["PUT", "DELETE"]),
    requestHeaders: corser.simpleRequestHeaders.concat(["X-Requested-With", "Authorization"])
}));

app.all('*', function(request, response, next) {    
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', true);
    response.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Authorization,Access-Control-Allow-Origin');
    response.header('Access-Control-Allow-Methods', 'POST,GET,DELETE');
    next();
});
var musculeRouter = require('./routes/muscule.js')(app);
var userRouter = require('./routes/user.js')(app);

app.listen(3000, function() {
    console.log('server online');
});
https.createServer(options, app).listen(8000);