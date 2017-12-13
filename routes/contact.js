var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { 
      title: 'Contact' 
    });
});

//send Email

router.post('/send', function(req, res, next){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'skiddygiddy@gmail.com',
            pass: 'DOMBO!(rembudzi*!'
        }
    });
   
    var mailOptions ={
        from: '"ArtiosDev" <skiddygiddy@gmail.com>',
        to: 'skiddygiddy@yahoo.co.uk',
        subject: 'Hello from ArtiosDev',
        text: 'You have a sun form.... Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
        html: '<p>You have a sub form....</p> <ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message Sent: ' + info.response);
        res.redirect('/');
    });
});

module.exports = router;