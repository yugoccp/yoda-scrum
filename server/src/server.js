const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Padawan = require('./models/Padawan');
const Meeting = require('./models/Meeting');
const initialPadawans = require('../data/data_padawans.json')
const app = express();

mongoose.connect('mongodb://localhost:27017/yoda_meeting_db');
const db = mongoose.connections;

// Initialize DB
Padawan.find({}, (err, padawans) => {
  console.log(padawans);
  if(padawans.length == 0) {
    console.log("Bring first padawans...")
    Padawan.collection.insert(initialPadawans, (err, result) => {
      console.log(result);
    });
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('../../build'));

app.get('/padawan', (req, res) => {
  const query = Padawan.find({}).select({ "_id": 0 })
  query.exec((err, padawans) => {
    console.log(padawans);
    res.send(padawans);
  });
});

app.post('/padawan', (req, res) => {
  const padawans = req.body;
  Padawan.collection.insert(padawans, (err, padawans) => {
    console.log(padawans);
  });
});

app.get('/meeting', (req, res) => {
  const query = Meeting.find({}).select({ "_id": 0, "padawansData._id": 0 });
  query.exec((err, meetings) => {
    console.log(meetings);
    res.send(meetings);
  })
});

app.post('/meeting', (req, res) => {
  const { meeting } = req.body;
  const meetingModel = new Meeting(meeting);
  meetingModel.save((err, result) => {
    if (err) {
      console.log("Error saving meeting..." + err);
      res.status(500).send("Error saving meeting..." + err);
    } else {
      console.log(result);
      res.send("Meeting saved!")
    }
  });
});

app.listen(3001, () => console.log('Listening on port 3001!'));
