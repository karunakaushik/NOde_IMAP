const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
//data Schema.........
const { mailSchema } = require('./schemas/mail');
const MailData = mongoose.model("MailData", mailSchema);
const app = express();

var Imap = require('imap'),
  inspect = require('util').inspect;

require('dotenv').config();

// let mailServer1 = new Imap({
//   user: process.env.EMAIL,
// password: process.env.PASSWORD,
//   host: 'imap.gmail.com',
//   port: 993,
//   tls: true,
//   tlsOptions: {
//     rejectUnauthorized: false
//   },
//   authTimeout: 3000
// }).once('error', function (err) {
//   console.log('Source Server Error:- ', err);
// });
// mailServer1.once('ready', function () {
//   mailServer1.openBox('INBOX', true, function (err, box) {
//     if (err) throw err;
//     console.log('message', 'server1 ready');
//   });
// });

// mailServer1.connect();

// const email = process.env.EMAIL;
// const password = process.env.PASSWORD;


var imap1 = new Imap({

  user: process.env.EMAIL,
  password: process.env.PASSWORD,
  host: 'imap.gmail.com',   // your mail host
  port: 993,  //host port
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  },
  authTimeout: 3000
}).once('error', function (err) {
  console.log('Source Server Error:- ', err);
});

imap1.once('ready', function () {
  imap1.openBox('INBOX', true, function (err, box) {
    if (err) throw err;
    console.log('message', 'Server Ready');
  });
  setInterval(function () {
    getEmailFromInbox(imap1);
  }, 3000);

})


imap1.connect();

let k = 0;

let getEmailFromInbox = (imap) => {
  imap.openBox('INBOX', true, function (err, box) {
    if (err) throw err;
    var f = imap.seq.fetch('*', {
      bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)', 'TEXT'],
      struct: true
      
    });


    f.on('message', function (msg, seqno) {
      var prefix = '(#' + seqno + ') ';
      if (k < seqno) {
        console.log('Message #%d', seqno);
        

        msg.on('body', function (stream, info) {
          var buffer = '';
          // var count = 0;
          stream.on('data', function (chunk) {
            // count += chunk.length;
            buffer = chunk.toString('utf8');
          });

          stream.once('end', function ( ) {
            // var x = JSON.stringify(buffer);
            console.log('Data:    ', buffer );
            // var da = {
            //   from: 'String',
            //   date: 'String',
            //   subject: 'String',
            //   body: x
            // }
            var myData = new MailData({buffer});
            myData.save()
            .then(data=> {
              console.log("data saved to database");
            })
            .catch(err => {
              console.log("unable to send data");
            });

            
      
          });
        });

        k = seqno;

      }

    });

    f.once('error', function (err) {
      console.log('Fetch error: ' + err);
    });

  });

}





