const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const request = require('request');
const _ = require('lodash');
const path = require('path');
const {initializePayment, verifyPayment} = require('../config/paystack')(request);

  // Load Models
let db = require('../config/keys');
let User =  require('../models/User');

// Payment Page
router.get('/rg', (req, res) => {
  const referred = req.query.refer;
    res.render('pay', {referred})
      });


router.get('/reg', (req, res) => {
    res.render('paynoref')
      });

router.post('/paystack/pay', (req, res) => {
  const form = _.pick(req.body,['amount','email','referrer']);
  form.metadata = {
    referrer : form.referrer
}
  form.amount *= 100;
  initializePayment(form, (error, body)=>{ 
      if(error){
          //handle errors
          return res.redirect('/payment/error')
          return;}
      response = JSON.parse(body);
      res.redirect(response.data.authorization_url)
  });
});


router.get('/paystack/callback', (req,res) => {
  const ref = req.query.reference;
  verifyPayment(ref, (error,body)=>{
      if(error){
          //handle errors appropriately
          return res.redirect('/payment/error');
      }
      response = JSON.parse(body);        

      const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.referrer']);

      [reference, amount, email, referrer] =  data;
      
      newUser = {reference, amount, email, referrer}

      const user = new User(newUser)

      user.save().then((user)=>{
          if(!user){
              return res.redirect('/payment/error');
          }
          res.redirect('/users/reger/'+user._id);
      }).catch((e)=>{
          res.redirect('/payment/error');
      })
  })
});


router.get('/error', (req, res)=>{
  res.render('error');
})

module.exports = router;
