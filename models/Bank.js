const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BankSchema = new mongoose.Schema({
  accountname: {
    type: String
  },
  bankname: {
    type: String
  },
  accountnumber: {
    type: Number
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'User'}
});

const Bank = mongoose.model('Bank', BankSchema);

module.exports = Bank;
