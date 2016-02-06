var express = require('express');
var db = require('./db');
var connection = require('./db/index.js').connection;

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Connect to database
connection.connect(function(err){
  if (err){
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

