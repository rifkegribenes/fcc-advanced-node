'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongo = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors());

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'pug');

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

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  } else {
    console.log('redirecting to homepage');
    res.redirect('/');
  }
};


app.route('/login')
  .post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {

});

app.route('/profile')
  .get(ensureAuthenticated, (req,res) => {
       res.render(process.cwd() + '/views/pug/profile', {
         username: req.user.username
       });
  });

app.route('/')
  .get((req, res) => {
    res.render(process.cwd() + '/views/pug/index', {
      title: 'Hello', 
      message: 'Please login',
      showLogin: true
    });
  });
