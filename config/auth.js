let User =  require('../models/User');

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: (req, res, next) => {
   
  
    if ( !req.isAuthenticated()){
      return next();
    }
    else {
     if ( req.user.role === 'user')  
    {
    res.render('dashboard', { 
      user: req.user
    })}
  
  else if(req.user.role === 'admin'){ 
    res.render('dashboard', { 
      user:req.user
    })
  }
    }}

};
