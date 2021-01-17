const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = new mongoose.Schema({

  balance: {
    type: Number
  },
  withdraw: {
    type: Number
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'User'}
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
