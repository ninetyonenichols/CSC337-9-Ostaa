/*
 * This file creates the server that powers the app. It also handles the database.
 * Author: Justin Nichols
 * Class: CSC337
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const host = '64.227.49.233';
const port = 80;

const app = express();
const db = mongoose.connection;
const mongoDBURL = 'mongodb://localhost/ostaa';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

var Schema = mongoose.Schema;

// Items
var ItemSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  stat: String 
  });
var Item = mongoose.model('Item', ItemSchema);

// Users
var UserSchema = new Schema({
  username: String,
  password: String,
  listings: [Schema.Types.ObjectId],
  purchases: [Schema.Types.ObjectId] 
  })
var User = mongoose.model('User', UserSchema);

app
  .use(express.static('public_html'))
  .get('/get/users', (req, res) => console.log("asdf"))
  .get('/get/items', (req, res) => console.log("asdf"))
  .get('/get/listings/:username', (req, res) => console.log("asdf"))
  .get('/get/purchases/:username', (req, res) => console.log("asdf"))
  .get('/search/users/:keyword', (req, res) => console.log("asdf"))
  .get('/search/items/:keyword', (req, res) => console.log("asdf"))
  .post('/add/user', (req, res) => console.log("asdf"))
  .post('/add/item/:username', (req, res) => console.log("asdf"))
  .all('*', (req, res) => res.redirect('/'))
  .listen(port, () => console.log('App listening.'))
