const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

const User = mongoose.model("users");
//One argument in model() means we are trying to fetch model out of mongoose

passport.serializeUser((user, done) => {
  done(null, user.id);
});
//user.id is not same as profile.id
//user.id is generated by MongoDB

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //we have a record of the given profile.id
          done(null, existingUser);
        } else {
          //we don't have a record of the given profile.id
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
    //Determines if should create new instance of user account or use one with same id
    //After user signs in, we don't care about googleID but use Mongo's assigned id
  )
);
