var models = require('../models');
var bluebird = require('bluebird');
var connection = require('../db/index.js').connection;
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (request, response) {

      connection.query('SELECT * FROM messages', function (error, results, fields) {
        if (error) { throw error; }

        var message = JSON.stringify(results);
        response.end(message); 
      });

    }, // a function which handles a get request for all messages
    post: function (request, response){
      var data = request.body;
      connection.query('INSERT INTO messages SET ?', data, function(err, result) {
        if (err) { throw err; }
      });

      response.end();
    },
    options: function(request, response){
      response.writeHead(200);
      response.end();
    } 
  },

  users: {
    // Ditto as above
    get: function (request, response) {

      connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) { throw error; }

        var message = JSON.stringify(results);
        response.end(message); 
      });

    },
    post: function (request, response) {

      var data = request.body;
      connection.query('INSERT INTO users SET ?', data, function(err, result) {
        if (err) { throw err; }
        console.log('results line 57 ', result);
      });

      response.end(); 
    }
  }
};

