const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken'); 
const User = require('../models/Users');
const { validateSignIn, validateSignUp } = require('../helpers/validation');

module.exports.controller = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post('/login', validateSignIn, async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      if (!user.password) {
        return res.status(401).json({ error: 'Social login user. Please use Google or Facebook.' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key', 
        { expiresIn: '1h' }
      );

      // Keep session for compatibility
      req.session.username = req.body.email;

      return res.status(200).json({
        message: 'User successfully logged in.',
        token, 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Login failed: ' + error.message });
    }
  });

  /*
  // Google OAuth
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    req.session.username = req.user.email;
    res.redirect('http://localhost:5173');
  });

  // Facebook OAuth
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    req.session.username = req.user.email;
    res.redirect('http://localhost:5173');
  });
  */
};
