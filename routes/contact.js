var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { 
      title: 'Contact', success: false, errors: req.session.errors
    });
    req.session.errors = null; // clear all errors after showing them to user
});
router.post('/send', function(req, res, next){
  // check validity
  req.check('email', 'A valid email is required').isEmail();
  req.check('name', 'Please fill in this field').notEmpty();
  req.check('company', 'Please fill in this field').notEmpty();
  req.check('message', 'Please fill in this field').notEmpty();
  req.check('phone');
  req.check('budget');
  req.check('start');
  req.check('hearaboutus');

  var errors = req.validationErrors();
  if (errors){
    req.session.errors = errors;
  }
  res.redirect('/');

});

module.exports = router; 