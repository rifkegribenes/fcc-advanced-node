'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
<<<<<<< HEAD
// const path        = require('path');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongo = require('mongodb').MongoClient;
=======
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
>>>>>>> 6bbea301e56cddc089e31513a8b39d6cbc99aaf7

const app = express();

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
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
      
    passport.deserializeUser((id, done) => {
      db.collection('users').findOne(
        {_id: new ObjectID(id)},
        (err, doc) => {
          done(null, doc);
        }
      );
    });
      
     passport.use(new LocalStrategy(
  function(username, password, done) {
    db.collection('users').findOne({ username: username }, function (err, user) {
      console.log('User '+ username +' attempted to log in.');
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (password !== user.password) { return done(null, false); }
      return done(null, user);
    });
  }
)); 
      
     app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    }); 

}});


app.route('/')
  .get((req, res) => {
    // res.render('index');
    res.render(process.cwd() + '/views/pug/index', {title: 'Hello', message: 'Please login'});
  });
=======
app.route('/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
>>>>>>> 6bbea301e56cddc089e31513a8b39d6cbc99aaf7
