var express = require('express');
var path = require('path');

var server = express();

server.use(express.static('static'));

server.get('/', function(req, res) {
    res.sendFile(path.resolve('index.html'));
});

server.get('/companies', function(req, res) {
    res.sendFile(path.resolve('resources/companies.json'));
});

server.listen(9000, function() {
    console.log('Serving from ' + path.resolve('./'));
});