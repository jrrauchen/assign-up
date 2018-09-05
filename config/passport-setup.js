const passport = require('passport');
const googleStrat = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id); //null is the error
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user); //null is the error
    });
});

passport.use(
  new googleStrat({
    //options for googlestrat
    callbackURL:"/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret:keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //check if user already exists in mongodb
    //console.log(profile); //logs google profile info
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser){
        //already have the user
        console.log('user is:', currentUser);
        done(null, currentUser);
      } else{
        //create a  new user in db
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        }).save().then((newUser) => {
          console.log('new user created:' + newUser);
          done(null, newUser);
        });
      }
    });
  })
);
