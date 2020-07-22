/*
 * This file creates the server that powers the app. It also manages the database.
 * Author: Justin Nichols
 * Class: CSC337
 */

 /*
    TODO:
      Look into create vs save.
      Handle duplicate item-postings.
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
  desc: String,
  image: String,
  price: Number,
  avail: String 
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
  .post('/add/user', (req, res) => addUser(req)) 
  .post('/add/item/:username', (req, res) => addItem(req))
  .all('*', (req, res) => res.redirect('/'))
  .listen(port, () => console.log('App listening.'))

/*
 * This function adds a user account to the database.
 * @param: req. The http request containing the account info.
 */
function addUser(req) {  
  let userObj = req.body;
  User.find({ username: userObj.username })
  .exec((error, results) => {
    if (results.length == 0) {
      user = new User({ username: userObj.username, password: userObj.password });
      user.save((err) => { if (err) { console.log('Could not save user.') }});
      console.log("Account created.");
    } else {
      console.log('Username already exists.');  
    }     
  });
}

/*
 * This function adds an item to the database.
 * @param: req. The http request containing the account info.
 */
function addItem(req) { 
  let itemObj = req.body;
  User.find({ username: req.params.username })
    .exec((error, results) => {
      if (results.length == 1) {
        item = new Item({ 
          title: itemObj.title,
          desc: itemObj.desc,
          image: itemObj.image,
          price: itemObj.price,
          avail: itemObj.avail 
        });
        item.save((err) => { if (err) { console.log('Could not save item.') }});
        results[0].purchases.push(item._id);
        console.log('Item added.'); 
      } else {
        console.log('Could not find seller.');
      }
    });
}
