const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../Models/User');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3001/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                done(null, user);
            } else {
                // Check if user exists with the same email
                user = await User.findOne({ email: newUser.email });
                if (user) {
                    // Link the Google account to the existing user
                    user.googleId = newUser.googleId;
                    user.displayName = newUser.displayName; // You might want to update the display name
                    await user.save();
                    done(null, user);
                } else {
                    // Create a new user
                    user = await User.create(newUser);
                    done(null, user);
                }
            }
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}
