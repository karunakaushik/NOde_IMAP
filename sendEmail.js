var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

var mailOptions = {
    from: process.env.EMAIL,
    to : process.env.EMAIL_RECEIVE,
    subject: 'Email Check',
    text : `Hello everyone, 
            how r u, how do u doing`
};
transporter.sendMail(mailOptions, function(err,info){
    if(err){
        console.log(err);
    }
    else{
        console.log('Email sent : ' + info.response);
    }
});


