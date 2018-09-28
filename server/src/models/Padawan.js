const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const padawanSchema = new Schema({
  name: String,
  username: String
});

module.exports = mongoose.model('Padawan', padawanSchema);
