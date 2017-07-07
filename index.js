const express = require("express");
const passport = require("passport");
const {BasicStrategy} = require("passport-http");

const {User} = require("./models");

app = express();

// Don't try this at home kids
passport.use(new BasicStrategy((username, password, done) =>
  User.findOne({where: { username, password }})
  .then(loggedInUser => done(null, loggedInUser || false))
));

app.get("/register/:username/:password", (req, res) =>
  User.create(req.params).then(() => res.redirect("/"))
);

app.get("/", passport.authenticate("basic", {session: false}), (req, res) =>
  res.send(`Hello, ${req.user.get("username")}! <a href="/logout">Log Out</a>`)
);

app.get("/logout", (req, res) => {
  res.status(401);
  res.send("Please register by using /register/:username/:password");
});

app.listen(3000, () => console.log("now listening to NPR...."));
