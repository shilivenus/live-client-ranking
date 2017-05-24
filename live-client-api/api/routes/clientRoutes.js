'use strict';


module.exports = function(app) {
  var clientController = require('../controllers/clientController');


  // client Routes
  app.get("/clients",clientController.getClients);
};
