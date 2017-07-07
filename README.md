# HTTP Basic Auth example
This repository is an example of using passport.js with express.js to do basic user authentication.

# Getting Started

## Installing dependencies
As long as you have node installed (with npm, if it's packaged separately on your OS), you should be
able to do the following:
```
$ npm install
$ npm run sql db:migrate
```

## Running
You can run the server with `npm start`. If you'd like to play around, I recommend
running `npm run watch` instead, which will watch the project files for changes and restart the server
automatically.

## Branches
This project has 3 branches:
- verbose (what you're most likely looking at): This branch is full of a ton of documentation and users
  verbose syntax for clarity. It's best if you are relatively new to JavaScript or find terse code difficult
  to read.
- terse: This branch removes all comments and takes advantage of some common JavaScript idioms to get rid of
  some of the boilerplate
- es6: This branch further removes boilerplate by taking advantage of ES6 (ES2017) features.

It is not necessary to read all branches to understand what this code is doing. They are included for those
that are suspicious about the amount of code that seems to be required in order to get things working.
