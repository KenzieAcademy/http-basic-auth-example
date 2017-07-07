const express = require("express");

// Passport is an authentication middleware
const passport = require("passport");

// When using it, you have to tell it what authentication "strategy" to use
const BasicStrategy = require("passport-http").BasicStrategy;

// The User model was generated with the following command:
//     $ sequelize model:create --name User --attributes "username:string password:string"
const models = require("./models");

app = express();

// We include this middleware for any route we want to hide behind user authentication.
const authMiddleware = passport.authenticate("basic", {session: false});

// We tell passport which strategy to use by passing a strategy instance to the `use` method.
// BasicStrategy takes a callback which expects a username, password, and a `done` callback.
// Any time the passport middleware is used, the user is prompted for their username and password.
// That username and password are passed to this function. The `done` callback. This done callback
// accepts an exception as it's first argument, and either the user that was authenticated or false
// to signal that a user still needs to log in. In our simple case, we unconditionally pass null
// to signify that we don't want to raise an exception, then either return the logged in user, or false.
passport.use(new BasicStrategy(function(username, password, done) {
    models.User.findAll().then(function(users) {
      // Array.prototype.find takes a function that accepts an element of the array and is expected
      // to return either true or false. This function is then called on each element of the array,
      // and find returns the first of these to return true. For example:
      // [1, 2, 3, 4, 5].find(function(num) {
      //    return num % 2 == 0;
      // })
      // The above returns the first element in the array [1, 2, 3, 4, 5] which is even, or 2.
      // If none of the items returns true, find will return undefined to signify that nothing was found.
      const loggedInUser = users.find(function(user) {
        return user.get("username") === username && user.get("password") === password;
      });

      if (loggedInUser) {
        return done(null, loggedInUser);
      } else {
        return done(null, false);
      }

    });
}));

// In a real application, you might use body-parser and render a registration form instead.
app.get('/register/:username/:password', function(req, res) {
  models.User.create(req.params)
    .then(function() {
      res.redirect("/");
    });
});

// Note the second argument here, which tells our app router that we want to protect this router
// using authentication middleware.
app.get("/", authMiddleware, function(req, res) {
    const user = req.user || "you";
    res.send('hello, ' + user.get("username") + '! <a href="/logout">Log Out</a>');
});

app.get("/logout", function(req, res) {
  // There isn't technically a way to logout using HTTP basic auth, so we emulate doing so by
  // returning a 401 (Unauthorized) response with a custom message. With more secure
  // authentication strategies, we could just do req.logout(), then do a proper redirect.
  res.status(401);
  res.send("Please register by using /register/:username/:password");
})

app.listen(3000, function() {
  console.log("now listening to NPR....");
});
