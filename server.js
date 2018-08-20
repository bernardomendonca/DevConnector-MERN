const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

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

// PASSPORT MIDDLEWARE
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// USE ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//process.env.PORT reffers to heroku and 5000 is the localhost
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
