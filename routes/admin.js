const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');

  // Load User
  let db = require('../config/keys');
  let User =  require('../models/User');
  let Bank =  require('../models/Bank');
  const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
  var afresh = User.find({});
  const { findById, getMaxListeners } = require('../models/User');


// Test Page to Update User  -  Test
router.get('/updateuser', (req, res) =>
  res.render('update')
);

// Get Single User
router.get("/view/:_id", (req, res) => {
  User.findById(req.user._id)
  .populate('bankdet')
  .exec(function(err, user){
    if (err) {
      res.send('something went really wrong');
      next();  }
      res.json(user)
    })
})


 // Gets All Populated Users
 router.get('/allusers', ensureAuthenticated, (req, res, next) => {
	User.find()
  .exec(function(err, users){
    if (err) {
      res.send('something went really wrong');
      next(); 
      }
      res.render('alluserstable', {users, count: users.length})})
});


 // Gets All Accounts
 router.get('/allbanks', ensureAuthenticated, (req, res, next) => {
	Bank.find()
  .exec(function(err, banks){
    if (err) {
      res.send('something went really wrong');
      next(); 
      }
      res.render('allbankstable', {banks, count: banks.length})})
});


router.get('/delete/:id', function(req, res, next) {
    var id=req.params.id;
    var del= User.findByIdAndDelete(id);
    del.exec(function(err){
    if(err) throw err;
    afresh.exec(function(err,data){
      if(err) throw err;
      res.render('login', {users: data})
        });
      });});


 module.exports = router;
