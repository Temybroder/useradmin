const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Tip = require('../models/Tip');


router.get('/witn/:_id', (req, res)=>{
  const id = req.params._id;
  User.findById(id)
  .then((user)=>{
       res.json(user);
  })
  .catch((e)=>{
    res.send('There was a problem')
})
})


router.get('/nof?', (req, res) =>{
   nip = req.query;
  console.log(nip);
   res.json({nip, 
    url: req.url
  });
 }
 );


 router.get('/nof', (req, res) =>{
 var nip = correctest;
 console.log(nip);
  res.json({nip, 
   url: req.url
 });
}
);


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  if (req.user.role === 'user')
  Tip.find({}, function (err, tips)
  {
  if (err){
  res.send('something went really wrong');
  next(); }
  res.render('dashboard', { user: req.user, tips} );
  });
 else if (req.user.role === 'admin')
  {
    Tip.find({}, function (err, tips)
    {
    if (err){
    res.send('something went really wrong');
    next(); }
    res.render('dashboard', { user: req.user, tips} );
    });
 }
})

router.get('/admindash', ensureAuthenticated, (req, res) =>{
  if (req.user.role === 'admin')
  
    res.render('admindashboard', {
      user: req.user
    });
  }
  );

  

module.exports = router;
