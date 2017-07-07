const express = require("express");
const passport = require("passport");
const {BasicStrategy} = require("passport-http");

const {User} = require("./models");

app = express();

// Note: I could have written this as a single expression, avoiding the `return`
// keyword all together, but that got rather difficult to read.
passport.use(new BasicStrategy((username, password, done) => {
  return User.findAll().then(users => {
    const loggedInUser = users.find(user =>
      user.get("username") === username && user.get("password") === password
    );

    return done(null, loggedInUser || false);
  })
}))

app.get("/register/:username/:password", (req, res) => {
  User.create(req.params).then(() => res.redirect("/"));
});

app.get("/", passport.authenticate("basic", {session: false}), (req, res) => {
  res.send(`Hello, ${req.user.get("username")}! <a href="/logout">Log Out</a>`);
});

app.get("/logout", (req, res) => {
  res.status(401);
  res.send("Please register by using /register/:username/:password");
});

app.listen(3000, () => console.log("now listening to NPR...."));
