'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/clientController');


  // todoList Routes
  app.route('/clients')
    .get(todoList.list_clients);
};