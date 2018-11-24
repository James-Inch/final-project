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


axios.get("https://www.climbing.com/").then(function (response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    // console.log(response.data);
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("div.l-grid--item").each(function (i, element) {

        // Save the text of the element in a "title" variable
        var title = $(element).text();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        var link = $(element).children().attr("href");

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title,
            link: link
        });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
});


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
