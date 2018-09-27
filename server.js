'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
// const path        = require('path');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');

const app = express();

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
// app.set("views", path.join(__dirname, "views/pug"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.route('/')
  .get((req, res) => {
    // res.render('index');
    res.render(process.cwd() + '/views/pug/index', {title: 'Hello', message: 'Please login'});
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
