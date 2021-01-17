const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipSchema = new mongoose.Schema({
  content: {
    type: String
  }
});

const Tip = mongoose.model('Tip', TipSchema);

module.exports = Tip;