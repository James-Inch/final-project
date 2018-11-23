var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// var exphbs = require("express-handlebars");


// Scrapping tools Axios for the http request and cheerio to pull out the html elements 
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express 
var app = express();

// Configure middleware 

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions 
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public directory
app.use(express.static("public"));

// Connect to the Mongo db 
mongoose.connect("mongodb://localhost/finalProject", { useNewUrlParser: true });

// Routes


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  