const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect home.
    // In a real app, you would probably issue a JWT token here
    // and redirect to the frontend with the token.
    const payload = {
        user: {
            id: req.user.id,
        },
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }, // Expires in 1 hour
        (err, token) => {
            if (err) throw err;
            // Redirect to the frontend and pass the token as a query parameter
            res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
        }
    );
});

module.exports = router;
