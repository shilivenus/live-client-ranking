'use strict';


var mongoose = require('mongoose');
var Client = mongoose.model('Client');

exports.getClients = function(req, res) {
	var orderby = req.query.orderby;
	var top = req.query.top;

	var clients = Client.find({}, function(err, client) {
	    if (err)
	      res.send(err);

	    res.json(client);
	  });

	if(orderby=='activevans'){
		clients.sort({ activevans: -1 });
	}else if(orderby=='accountbalance'){
		clients.sort({ accountbalance: -1 });
	}

	if(top!=null)
		clients.limit(parseInt(top));
};
