// password = password for .pfx file (development)
var fs = require('fs');
var options = {
  key: fs.readFileSync(__dirname+'/c9610c2b-bddc-4f89-ac6c-e7f4f7549cfb.private.pem').toString(),
  cert: fs.readFileSync(__dirname+'/c9610c2b-bddc-4f89-ac6c-e7f4f7549cfb.public.pem').toString()
};
module.exports = options;