var models = require('../models');
var bluebird = require('bluebird');
var connection = require('../db/index.js').connection;
var mysql = require('mysql');


module.exports = {
  messages: {
    get: function (request, response) {

      connection.query('SELECT * FROM messages', function (error, results, fields) {
        if (error) { throw error; }
        // error will be an Error if one occurred during the query 
        // results will contain the results of the query 
        // fields will contain information about the returned results fields (if any)
        var message = JSON.stringify(results);
        response.end(message); 
      });

    }, // a function which handles a get request for all messages
    post: function (request, response){
      // res.writehead(201);
      var data = request.body;
      //console.log('data ', data)
      connection.query('INSERT INTO messages SET ?', data, function(err, result) {
        if (err) { throw err; }
        //console.log('succesfully posted! results', result);
      });

      //end the response
      response.end();
    } 
  },

  users: {
    // Ditto as above
    get: function (request, response) {

      connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) { throw error; }
        // error will be an Error if one occurred during the query 
        // results will contain the results of the query 
        // fields will contain information about the returned results fields (if any)
        var message = JSON.stringify(results);
        response.end(message); 
      });

    },
    post: function (request, response) {

      // res.writehead(201);
      // console.log('post called');
      // console.log(request.body)
      var data = request.body;
      connection.query('INSERT INTO users SET ?', data, function(err, result) {
        if (err) { throw err; }
        console.log('results line 57 ', result);
      });

      //end the response
      response.end(); 
    }
  }
};

