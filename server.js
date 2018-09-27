'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
// const path        = require('path');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const mongo = require('mongodb').MongoClient;

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

app.use(passport.initialize());
app.use(passport.session());

const ObjectID = require('mongodb').ObjectID;

mongo.connect(process.env.DATABASE, (err, db) => {
    if(err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');

        //serialization and app.listen
      passport.serializeUser((user, done) => {
   done(null, user._id);
 });

}});




passport.deserializeUser((id, done) => {
  done(null,null);
  // db.collection('users').findOne(
  //   {_id: new ObjectID(id)},
  //   (err, doc) => {
      // done(null, doc);
  //   }
  // );
});

app.route('/')
  .get((req, res) => {
    // res.render('index');
    res.render(process.cwd() + '/views/pug/index', {title: 'Hello', message: 'Please login'});
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
