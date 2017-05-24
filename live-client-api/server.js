var express = require('express');
var app = express();
var port = process.env.PORT || 3000; 
var mongoose = require('mongoose');
var Client = require('./api/models/clientModel');
var bodyParser= require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/testdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/clientroutes');
routes(app);

app.listen(port);

console.log('client RESTful API server started on: ' + port);



