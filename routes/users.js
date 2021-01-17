const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');
const url = require('url');
const { nanoid } = require('nanoid');

  // Load User
let db = require('../config/keys');
// Load Models
let User =  require('../models/User');
let Bank =  require('../models/Bank');
let Task =  require('../models/Task');
let Tip =  require('../models/Tip');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { findById } = require('../models/User');
const { query } = require('express');

// LINK AT POINT OF REGISTRATION, BEING WORKED ON TO CONFIRM UPDATE POPULATED ROUTE BELOW, IS WORKING
// http://localhost:5000/users/interm/600152e21af9e229e01a75a8


router.get('/treys/:referrer', (req, res)=>{
  const id = req.params.referrer;
  User.findOne({referrer: id})
  .populate('accountdet')
  .then((user)=>{
      if(!user){
          //handle case where the user is not found
          req.flash('success_msg', 'Your Worka-Nigeria Account is Created');
          res.redirect('/users/login')
          }
   { const assigned = user.accountdet;
      if(assigned.length > 0){
     const obtained = assigned[assigned.length - 1];
     obtained.balance = obtained.balance + 100;
      }
    // obtained.balance = updatedBalance;
      user.save();
    res.json(user); 
    }
  })
  .catch((e)=>{
      res.send('There was an issue')
  })
})


  router.get('/interm/:referrer', (req, res)=>{
    const id = req.params.referrer;
    User.findOne({referrallink: id})
    .populate(['accountdet', 'bankdet'])
    .then((user)=>{
        if(!user){
            //handle case where the user is not found
            req.flash('success_msg', 'Your Worka-Nigeria Account is Created');
            res.redirect('/users/login')
            }
     { const assigned = user.accountdet;
        if(assigned.length > 0){
       const obtained = assigned[assigned.length - 1];
       obtained.balance = obtained.balance + 100;
        }
      // obtained.balance = updatedBalance;
        user.save();
        req.flash('success_msg', 'Your Worka-Nigeria Account is Created');
        res.redirect('/users/login'); 
      }
    })
    .catch((e)=>{
        res.redirect('/payment/error')
    })
  })

  

  router.get('/deserm/:referrer', (req, res) =>{
    var refd = req.params.referrer;
    User.findOneAndUpdate ({referrallink: refd}, 
      { 
        "$set": { "accountdet.balance" : '200' }
    }, 
      { new: true }, function (err, user) {
      if (err) {
      console.log(err);
     } 
     req.flash('success_msg', 'Your Worka-Nigeria Account is Created');
     res.redirect('/users/login'); 
    })
    })
  
  

  router.get('/bgtenerm/:referrer', (req, res) =>{
    var refd = req.params.referrer;
    User.findOneAndUpdate ({referrallink: refd}, 
      { $inc: {
      referralcount :+1
      }}, 
      { new: false }, function (err, user) {
      if (err) {
      console.log(err);
     } 
     req.flash('success_msg', 'Your Worka-Nigeria Account is Created');
     res.redirect('/users/login'); 
    })
  
    })
  

// Register Page
router.get('/reger/:_id', (req, res)=>{
  const id = req.params._id;
  User.findById(id)
  .then((user)=>{
      if(!user){
          //handle error when the user is not found
          res.redirect('/payment/error')
      }
        res.render('register',{user: req.user});
  }).catch((e)=>{
      res.redirect('/payment/error')
  })
})

// Route to get Populated Payments Page
router.get("/payments/:_id", ensureAuthenticated, (req, res, next) => {
  var id = req.user._id;
  User.findById(id)
  .populate('accountdet')
  .exec(function(err, user){
    if (err) {
      res.send('something went really wrong');
      next(); 
      }
      assigned = user.accountdet;
      if(assigned.length > 0){
     obtained = assigned[assigned.length - 1];
     newValue = obtained.balance;
  }    else 
 newValue = 50;

      res.render('payments', {
        user: req.user, newValue, assigned
      })    })
}) 


// Register Page
router.get('/view/:id', (req, res)=>{
  const id = req.params.id;
  User.findById(id)
  .populate(['accountdet', 'bankdet'])
  .then((user)=>{
      if(!user){
          //handle error when the user is not found
          res.redirect('/payment/error')
          }
   { const assigned = user.accountdet;
     const obtained = assigned[assigned.length - 1];
     var updatedBalance = obtained.balance;
     obtained.balance = updatedBalance + 230;
      user.update();
     res.json(user);}
  })
  .catch((e)=>{
      res.send('There was a problem')
  })
})


// Route to Get Confirm Payment Page
router.get('/cadnfperyutrsct/:_id', ensureAuthenticated, (req, res) =>{
  var id = req.user._id;
  console.log(id);
  User.findById(id)
  .populate(['bankdet', 'accountdet'])
  .exec(function(err, user){
    if (err) {
      res.send('something went really wrong');
      next(); 
      }
      res.render('confirmpayment', {user: req.user})  
   })
});



// Table Page
router.get('/regtrial', (req, res) =>
  res.render('register-trial')
);

// Home Page
router.get('/welcome', forwardAuthenticated, (req, res) => res.render('welcome'));

// About Page
router.get('/about', (req, res) => res.render('about'));

// Services Page
router.get('/services', forwardAuthenticated, (req, res) => res.render('services'));

// Contact Page
router.get('/contact', (req, res) => res.render('contact'));

// Terms Page
router.get('/terms', (req, res) => res.render('terms'));


// FAQ Page
router.get('/faq', (req, res) => res.render('faq'));

// Settings Page
router.get('/settings', ensureAuthenticated, (req, res) =>
  res.render('settings', {
    user: req.user
  })
);
// Security Page
router.get('/security', ensureAuthenticated, (req, res) =>
  res.render('security', {
    user: req.user
  })
);

// Payments Page
router.get('/payments', ensureAuthenticated, (req, res) =>
  res.render('payments', {
    user: req.user
  })
);


// Form for Admin to Fill Tasks and Send to Users Page
router.get('/admintasks', ensureAuthenticated, (req, res) =>
  res.render('tasks', {
    user: req.user
  })
);


// Form for Admin to Fill Daily Tips and Send to Users Page
router.get('/admintips', ensureAuthenticated, (req, res) =>
  res.render('tips', {
    user: req.user
  })
);


// Form for Admin to Fill Daily Tips and Send to Users Page
router.get('/admrrifis', ensureAuthenticated, (req, res) =>
  res.render('adminnotifications', {
    user: req.user
  })
);


// Form for Admin to Fill Daily Tips and Send to Users Page
router.get('/fill', ensureAuthenticated, (req, res) =>
  res.render('formbizname', {
    user: req.user
  })
);



// Page to Submit Completed Project
router.get('/subclp', ensureAuthenticated, (req, res) =>
  res.render('completedlawproj', {
    user: req.user
  })
);

// Notifications Page
router.get('/notifications', ensureAuthenticated, (req, res) =>
  res.render('notifications', {
    user: req.user
  })
);


// Project Dasboard Page
router.get('/lpjs', ensureAuthenticated, function (req, res) {
  Task.find({}, function (err, tasks)
  {
  if (err){
  res.send('something went really wrong');
  next(); 
  }
  res.render('taskboard', {user: req.user, tasks} );
  }
  )}
  );


// Page to Submit Completed Project
router.get('/yds&xbqev&cmigl', ensureAuthenticated, (req, res) =>
  res.render('bankdetails', {
    user: req.user
  })
);

// Table Page
router.get('/security', ensureAuthenticated, (req, res) =>
  res.render('security', {
    user: req.user
  })
);

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));


// Register
router.post('/registerGrader', (req, res) => {

  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      var id = user._id;
      if (!user) {
        errors.push({ msg: 'Ouch! Registration error: Confirm Payment was Successful Before Proceeding' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        var newUser = {
          referrallink: nanoid(10),
          referralcount: 0,
          name: req.body.name,
          email : req.body.email,
          password : req.body.password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;  
            User.findByIdAndUpdate(id,
              { $set: {
                referrallink: newUser.referrallink,
                referralcount: newUser.referralcount,
                name: newUser.name,
                password: newUser.password
              }}, 
              { new: true }, function (err, user) {
                
              if (err) {
                res.render("error");
                } 
                res.redirect('/users/interm/'+user.referrer);
            })
          });
        });
      }
    });
  }
});




// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});



// router.delete("/:id", (req, res) => {
  // Puppy.findByIdAndDelete(req.params.id)
 //   .then(() => res.json("Puppy deleted =( "))
 //   .catch(err => res.status(400).json("Error: " + err))
// })





// Register
router.post('/backupofregisterGrader', (req, res) => {

  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      var id = user._id;
      if (!user) {
        errors.push({ msg: 'Ouch! That Email already exists. Also, Confirm Payment was Successful Before Proceeding' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        var newUser = {
          referrallink: nanoid(10),
          name: req.body.name,
          email : req.body.email,
          password : req.body.password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;  
            User.findByIdAndUpdate(id,
              { $set: {
                referrallink: newUser.referrallink,
                name: newUser.name,
                password: newUser.password
              }}, 
              { new: true }, function (err, user) {
                
              if (err) {
              res.render("error");
              } 
              req.flash('success_msg', 'Your Worka-Nigeria Account is Created');
              res.redirect('/users/login');
            })
          });
        });
      }
    });
  }
});



module.exports = router;
