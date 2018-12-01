const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes");
const app = express();

// const db = require("./models");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(routes);


const MONGOD_URI = process.env.MONGOD_URI || "mongodb://localhost/climbMongo"; 
mongoose.connect(MONGOD_URI, { useNewUrlParser: true });

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));