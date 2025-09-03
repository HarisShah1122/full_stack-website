const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/Users'); 
const { validateSignIn, validateSignUp } = require('../helpers/validation'); 

module.exports.controller = (app) => {
  // Login
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
      req.session.username = req.body.email;
      return res.status(200).json({ message: 'User successfully logged in.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Login failed: ' + error.message });
    }
  });

  // Signup
  app.post('/signup', validateSignUp, async (req, res) => {
    try {
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'User registration failed: ' + error.message });
    }
  });

  // Check Authentication
  app.get('/check-auth', (req, res) => {
    if (req.session && req.session.username) {
      return res.status(200).json({ message: 'Authenticated', email: req.session.username });
    }
    return res.status(401).json({ error: 'Not authenticated' });
  });

  // Logout
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed: ' + err.message });
      }
      return res.status(200).json({ message: 'Logged out successfully.' });
    });
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
