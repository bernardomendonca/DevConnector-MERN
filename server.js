const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// BodyParser Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATABASE CONFIGURATION
const db = require("./config/keys.js").mongoURI;

// Connecting to MongoDB through mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

// USE ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//process.env.PORT reffers to heroku and 5000 is the localhost
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
