require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('./config/passport-config');
const cors = require('cors');

const SECRET_SESSION = process.env.JWT_SECRET_KEY;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Mount controllers
app.use('/api/auth', require('./controllers/auth'));
app.use('/api/test', require('./controllers/test'));
app.use('/api/iplatlong', require('./controllers/iplatlong'));
app.use('/api/fire', require('./controllers/fire'));
app.use('/api/weather', require('./controllers/weather'));

// Non-REST route
app.get('/api', (req, res) => {
  res.send('This message was emitted by the backend.');
});

// Catch-all route for React
app.get('*', (req, res) => {
  res.sendFile(
    path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html')
  );
});

// Start server
const PORT = process.env.PORT || 3000; // Default to 3000 if not set
const server = app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}.`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = server;