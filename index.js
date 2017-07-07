const express = require("express");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

const models = require("./models");

app = express();

passport.use(new BasicStrategy(function(username, password, done) {
    models.User.findAll().then(function(users) {
      const loggedInUser = users.find(function(user) {
        return user.get("username") === username && user.get("password") === password;
      });

      return done(null, loggedInUser || false);
    });
}));

app.get('/register/:username/:password', function(req, res) {
  models.User.create(req.params)
    .then(function() {
      res.redirect("/");
    });
});

app.get("/", passport.authenticate("basic", {session: false}), function(req, res) {
    res.send(`hello, ${req.user.get("username")}! <a href="/logout">LogOut</a>`);
});

app.get("/logout", function(req, res) {
  res.status(401);
  res.send("Please register by using /register/:username/:password");
})

app.listen(3000, function() {
  console.log("now listening to NPR....");
});
