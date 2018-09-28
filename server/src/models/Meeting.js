const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  padawansData: { type: [{ username: String, timeInSec: Number }], required: [true, 'No padawans?!'] },
  date: { type: Date, default: Date.now },
  timeout: { type: Number, required: [ true, 'No timeout?!' ] },
  timeInSec: { type: Number, required: [ true, 'No time spent in meeting?!' ] }
})

module.exports = mongoose.model('Meeting', meetingSchema);
