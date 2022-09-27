const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// const userRoute = require('./routes/user');
const userRoute = require('./routes/user');

require('dotenv/config');

const app = express();
// connect hier met ander localhost
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(productRoute);
// app.use(artistRoute);
app.use(userRoute);
// app.use(ordersRoute);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'CodeQuest',
}).then(() => console.log("Connected to CodeQuest DB"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });



    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback: true,
      },
      function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }));
      
      passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) });