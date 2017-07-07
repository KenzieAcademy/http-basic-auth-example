const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const BasicStrategy = require("passport-http").BasicStrategy;

const models = require("./models");

app = express();
app.use(bodyParser.urlencoded({expand: true}));

const authMiddleware = passport.authenticate("basic", {session: false});

passport.use(new BasicStrategy(function(username, password, done) {
    models.User.findAll().then(function(users) {
      const loggedInUser = users.find(function(user) {
        return user.get("username") === username && user.get("password") === password;
      });
      console.log(loggedInUser);
      return done(null, loggedInUser ? loggedInUser.get("username") : false);
    })
}));

app.get('/register/:username/:password', function(req, res) {
  models.User.create(req.params)
    .then(function() {
      res.redirect("/");
    });
});

app.get("/", authMiddleware, function(req, res) {
    res.send(`Hello, ${req.user || "you"}! <a href="/logout">Log Out</a>`);
});

app.get("/logout", function(req, res) {
  res.status(401);
  res.send("Please register by using /register/:username/:password");
})

app.listen(3000, function() {
  console.log("now listening to NPR....");
});
