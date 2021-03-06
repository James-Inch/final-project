require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const jwt = require('jsonwebtoken');
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");
const passport = require("./utils/passport");

const PORT = process.env.PORT || 3001;

const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({
    where: {
      email
    }
  })
    .then(user => {
      if (!user)
        return res.status(401).json({ succsess: false, msg: "Authentication failed." })

      if (password === user.password) {
        const token = jwt.sign(user.toJSON(), process.env.LOGIN_JWT_SECRET);
        res.json({ success: true, token: 'JWT ' + token });
      } else {
        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
      }
    })
    .catch(err => console.log(err));
});

app.get("/api/articles", (req, res) => {
  axios.get("https://www.climbing.com/").then(function (response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    // console.log(response.data);
    const $ = cheerio.load(response.data);

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
    res.json(results);
  });
});


// Define API routes here
app.get("/api/test", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send("It's working!!!");
});

app.get("/api/message", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: "Hello world" });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🌎 ==> Server now on port ${PORT}!`);
    });
  })
  .catch(err => console.log(err));