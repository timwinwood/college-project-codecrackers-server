/**
 * index.js - the entry point to the express.js application
 *
 * @author Tim Winwood - x20213638
 * @version 1.0
 */
require("./models/User");
require("./models/Algo");
require("./models/Level");
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const algoRoutes = require("./routes/algoRoutes");
const levelRoutes = require("./routes/levelRoutes");
const requireAuth = require("./middleware/requireAuth");

// declare the express app and add the Route modules
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(algoRoutes);
app.use(levelRoutes);

// add the public folder to the express app, to provide access to public images
app.use(express.static(__dirname + '/public'));

// get the MongoDB URI from an environment variable
const mongoUri = process.env.URI_MONGO;
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.`
  );
}

// connect to the MongoDB database
mongoose.connect(mongoUri);

// when connected, print a message to the console
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

// on error, print a message to the console
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

// get route to base URL
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

// listen for requests on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
