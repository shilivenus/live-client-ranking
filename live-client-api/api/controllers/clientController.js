'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Clients');

exports.list_clients = function(req, res) {
  Task.find({}, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};
