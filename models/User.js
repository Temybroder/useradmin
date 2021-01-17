const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  full_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  amount: {
      type: Number
  },
  reference: {
      type: String
  },
  phone: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  referrallink: {
    type: String
  },
  referralcount: {
    type: Number
  },
  referrer: {
    type: String
  },
  refcode: {
    type: String
  },
  role: {
    type: String,
    default: "user",
    enum: ['user', 'admin']
  },
  bankdet: {
    type: Schema.Types.ObjectId, ref: 'Bank'},

  accountdet: [{
      type: Schema.Types.ObjectId, ref: 'Account'}]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
