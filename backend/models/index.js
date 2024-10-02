require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBURI);
//import models

const User = require('./user');

const db = mongoose.connection;

db.once('open', () =>
  console.log(`Connected to MongoDB at ${db.host}.${db.port}`)
);
db.on('error', (error) => console.log('Database error \n', error));

module.exports = {
  //models export
  User,
  Test: require('./test'),
};
