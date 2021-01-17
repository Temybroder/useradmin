const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');
const request = require('request');
const { ensureAuthenticated } = require('../config/auth');
const {initializePayment, verifyPayment} = require('../config/paystack')(request);

// Load Models
let User =  require('../models/User');
let Bank =  require('../models/Bank');
let Account =  require('../models/Account');
let Task =  require('../models/Task');
let Tip =  require('../models/Tip');

const incrementTwo = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 2;
	return balance;  }

const incrementFour = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 4;
	return balance;  }

const incrementFive = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 5;
	return balance;  }

const incrementTen = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 10;
	return balance;  }

const incrementTwenty = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 20;
	return balance;  }

const incrementThirty = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 30;
	return balance;  }

const incrementFifty = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 50;
	return balance;  }

const incrementHundred = function (mod, balance){
	var mod = req.body.balance;
	var balance = mod + 100;
	return balance;  }


router.post("/update/:Id", ensureAuthenticated, function (req, res) {
	var Id = req.user.Id;
	User.findByIdAndUpdate(Id, 
    { $set: { name: req.body.name, 
      phone: req.body.phone
    
		}}, 
		{ new: true }, function (err, user) {
	  if (err) {
		res.render("settings", {user: req.body});
	  } 
	  req.flash('success_msg', 'Your Profile is now Updated');
	  res.redirect("/users/settings");
	})
  });

  
 // Route to Activate Payment Account before Commencing Withdrawals
 router.post("/ext&plzrtptopqwtl", ensureAuthenticated, function (req, res) {
	 console.log(req.user._id);
	 var balance = req.body.balance;
	 var withdraw = req.body.withdraw;

	const newAccount = new Account({
		balance,
		withdraw
	
	  });
	  console.log(typeof balance)
		  newAccount
			.save()
			.then(account => {
				User.findByIdAndUpdate(req.user._id, 
					{ $set: {
					  accountdet: account._id
					}}, 
					{ new: true }, function (err, user) {
					if (err) {
					console.log(err);
					} 
					req.flash(
						'success_msg',
						'Success: Withdrawals Activated' );
						res.redirect('/users/payments/:_id'); 
				})
		  })
  });


  // Route to Submit balance Withdrawal details, before Final Confirmation
  router.post("/suertytptopyf", ensureAuthenticated, function (req, res) {
console.log(assigned.balance);
		var adopt = req.user.accountdet;
		var obtained = adopt[Number(adopt.length) - 1];
		var modBalance = obtained.balance;
		var modBalance = assigned.balance;
		var modWithdraw = req.body.withdraw;
		var newBalance = modBalance - modWithdraw;
		
	let newAccount = new Account({
		balance :  newBalance,
		withdraw : modWithdraw
	  });
		  newAccount
			.save()
			.then(account => {
				User.findByIdAndUpdate(req.user._id, 
					{ $set: {
					  account: account._id
					}}, 
					{ new: true }, function (err, user) {
					if (err) {
					res.send('Error: Please Confirm withdrawal details');
					} 
					req.flash(
						'success_msg',
						'Success: Withdrawal Queued, Please Confirm' );
						res.redirect('/users/cadnfperyutrsct/:id');
				})
		  })
  });


const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
const storage = multer.diskStorage({ 
	destination: (req, file, cb) => { 
		cb(null, 'C:/auth-anew/routes/uploads') 
	}, 
	filename: (req, file, cb) => { 
		cb(null, file.fieldname + '-' + Date.now()) 
	} 
}); 
const upload = multer({ storage: storage }); 


// Submit Bank Account Data submitted via Form
router.post('/submitbnf', ensureAuthenticated, (req, res) => {
	const newBank = new Bank({
	  _id: new mongoose.Types.ObjectId(),
	  owner: req.user._id,
	  bankname : req.body.bankname,
	  accountname : req.body.accountname,
	  accountnumber : req.body.accountnumber
	 });
	 newBank
	 .save()
	 .then(bank => {
			User.findByIdAndUpdate(req.user._id, 
			  { $set: {
				bankdet: bank._id
			  }}, 
			  { new: true }, function (err, user) {
			  if (err) {
			  console.log(err);
			  res.render("bankdetails", {user: req.body});  } })
		  req.flash(
			  'success_msg',
			  'Success: Bank details Submitted' );
			res.redirect('/users/yds&xbqev&cmigl');
		  })});


// Submit Business Name registration request submitted via Image Upload
router.post('/submitbnu', upload.single('image'), (req, res, next) => {
  let newBiznameupload = new Biznameupload({
		img: { 
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
			contentType: 'image/png'
		}})
      newBiznameupload
        .save()
        .then(biznameupload => {
          req.flash(
            'success_msg',
            'Submitted: The Availability of Your Business Name will now be confirmed'
          );
          res.redirect('/dashboard');
        })
      });



// Route for Admin to Submit Task for Users
router.post('/subadmjta&sk12gh', ensureAuthenticated, (req, res) => {
  const newTask = new Task({
    title : req.body.title,
    earning : req.body.earning,
    link : req.body.link
  });
      newTask
        .save()
        .then(task => {
          req.flash(
            'success_msg',
            'Task has Been Sent to Users'
          );
          res.redirect('/users/admintasks');
        })
});


// Route for Admin to Submit Daily Tips for Users
router.post('/subadmhrs&mf83gh', ensureAuthenticated, (req, res) => {
  const newTip = new Tip({
    content : req.body.content
  });
      newTip
        .save()
        .then(tip => {
          req.flash(
            'success_msg',
            'Tip has Been Sent to Users'
          );
          res.redirect('/users/admintips');
        })
});


module.exports = router;