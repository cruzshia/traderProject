var express = require('express');
var app = express();
var path = require("path");

const dir = path.resolve(__dirname, "../build");

app.use(express.static(dir));

app.get('*', function (req, res) {
    res.sendFile(path.join(dir + '/index.html'));
});
 
var server = app.listen(8000, function () {
 
  var host = server.address().address;
  host = host === '::' ? 'localhost' : host;
  var port = server.address().port;
 
  console.log("access address is http://%s:%s", host, port);
 
});