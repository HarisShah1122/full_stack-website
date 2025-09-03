require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config/config');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');
const passport = require('passport');
const User = require('./models/Users');
const cors = require('cors');

// Debug environment variables
console.log('Environment variables:', {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_NAME: process.env.DB_NAME,
});

// Initialize Passport
require('./config/passport');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || '8Kj9mPq2v',
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: 'lax',
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const JWT_SECRET = process.env.JWT_SECRET || '8Kj9mPq2v';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

if (fs.existsSync('./controllers')) {
  fs.readdirSync('./controllers').forEach(function (file) {
    if (file.endsWith('.js')) {
      try {
        let route = require(`./controllers/${file}`);
        if (typeof route.controller !== 'function') {
          console.error(`Error: ${file} does not export a valid controller function`);
        } else {
          console.log(`Loading controller: ${file}`);
          route.controller(app);
        }
      } catch (err) {
        console.error(`Failed to load ${file}:`, err.message);
        console.error(err.stack);
      }
    }
  });
} else {
  console.warn('Controllers directory not found, skipping controller loading');
}

const port = process.env.PORT || 8081;
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });