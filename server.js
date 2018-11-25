var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require('request');
var exphbs = require("express-handlebars");


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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes

app.get("/", function (req, res) {
    res.render("index");
});

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

request('https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=f3039ebd&app_key=6ff5049390195df5a37b9a49ee20b496', function (error, response, body) {
    // Print the error if one occurred
    console.log('error:', error);
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode);
    // Print the HTML for Api results.

    var json = JSON.parse(body);


    console.log(json.parsed);
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
