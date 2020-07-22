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
const mongoDBURL = 'mongodb://localhost/dbnamehere';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

// TODO: insert schemas



app
  .use(express.static('public_html'))
  .all('*', (req, res) => res.redirect('/'))
  .listen(port, () => console.log('App listening.'))
