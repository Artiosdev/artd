var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require ('nodemailer');


var index = require('./routes/index');
var about = require('./routes/about');
var services = require('./routes/services');
var privacypolicy = require('./routes/privacy-policy');
var contact = require('./routes/contact');
var process = require('./routes/process');
var thanks = require('./routes/thanks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/about', about);
app.use('/services', services);
app.use('/privacy-policy', privacypolicy);
app.use('/contact', contact);
app.use('/process', process);
app.use('/thanks',thanks);

app.post('/send', (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
`;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'mail.artiosdev.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: 'hello@artiosdev.com', // generated ethereal user
      pass: 'DOMBO19rembudzi81'  // generated ethereal password
  },
  tls:{
    rejectUnauthorized:false
  }
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"Nodemailer Contact" <hello@artiosdev.com>', // sender address
  to: 'hello@artiosdev.com', // list of receivers
  subject: 'Node Contact Request', // Subject line
  text: 'Hello world?', // plain text body
  html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);   
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  res.render('thanks', {msg:'Email has been sent'});
});
});
/*app.post('/contact', function (req, res){
  var mailOpts, smtpTrans;

  smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
      user:'skiddygiddy@gmail.com',
      pass: 123
    }
  });

  mailOpts ={
    from:req.body.name + '&lt;' + req.body.email + '&gt;',
    to: 'skiddygiddy@yahoo.co.uk',
    subject: 'work',
    text: req.body.message + ' || NAAM:'+req.body.name + ' || EMAIL: '+req.body.email
  };

  smtpTrans.sendMail(mailOpts, function (error, info){

    if(error){
      res.render('contact',{
        title: 'Contact',
        page: 'contact',
        type:'error',
        description: 'email'
      });
    }
    else{
      res.render('contact',{
        title: 'Contact',
        page: 'contact',
        type:'error',
        description: 'email'});
    }
  });

});
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
