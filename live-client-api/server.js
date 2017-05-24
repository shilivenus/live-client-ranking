var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000; 
var mongoose = require('mongoose');
var Client = require('./api/models/clientModel');
var bodyParser= require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Client');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var routes = require('./api/routes/clientroutes');
routes(app);

app.listen(port);

console.log('client RESTful API server started on: ' + port);



