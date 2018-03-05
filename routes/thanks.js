var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET thanks page. */
router.get('/', function(req, res, next) {
  res.render('thanks', { 
      title: 'Thanks' 
    });
});

module.exports = router; 