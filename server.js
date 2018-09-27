'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path')
const fccTesting  = require('./freeCodeCamp/fcctesting.js');

const app = express();

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

app.route('/')
  .get((req, res) => {
    res.render('index');
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
