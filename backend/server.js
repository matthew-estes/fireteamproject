// External requires

require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('./config/passport-config');
let livereload = undefined;
let connectLivereload = undefined;
if (process.env.ON_HEROKU === 'false') {
  console.log('processing dev-only require() statements...');
  livereload = require('livereload');
  connectLivereload = require('connect-livereload');
}

// Internal requires

const testController = require('./controllers/test');
const iplatlongController = require('./controllers/iplatlong');
const models = require('./models/index');
const testModel = models.testModel;

const SECRET_SESSION = process.env.JWT_SECRET_KEY;

//session config
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

// initial passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the React build folder for static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')));

let livereloadServer = undefined;
if (process.env.ON_HEROKU === 'false') {
  console.log(
    'Processing dev-only liveload and connect-livereload configuration.'
  );
  livereloadServer = livereload.createServer();
  livereloadServer.server.once('connection', () => {
    setTimeout(() => {
      livereloadServer.refresh('/');
    }, 100);
  });
  app.use(connectLivereload());
}

// middleware for tracking users and alerts
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next(); // going to said route
});

// Mount controllers

app.use('/auth', require('./controllers/auth'));
app.use('/api/test', testController);
app.use('/api/iplatlong', iplatlongController);

// Non-REST routes

app.get('/api', (req, res) => {
  res.send('This message was emitted by the backend.');
});

// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
  res.sendFile(
    path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html')
  );
});

// Start server

const server = app.listen(process.env.PORT, () => {
  console.log(`Express is listening on port ${process.env.PORT}.`);
});

module.exports = server;
