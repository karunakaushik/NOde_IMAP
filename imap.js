const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
//imap simle.........
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
var imaps = require('imap-simple');

//data Schema.........
const { mailSchema } = require('./schemas/mail');
const MailData = mongoose.model("MailData", mailSchema);
const app = express();


require('dotenv').config();


var config = {
  imap: {
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
    host: 'imap.gmail.com',   // your mail host
    port: 993,  //host port
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false
    },
    authTimeout: 3000
  }
};

// var imap1 = new Imap({

//   user: process.env.EMAIL,
//   password: process.env.PASSWORD,
//   host: 'imap.gmail.com',   // your mail host
//   port: 993,  //host port
//   tls: true,
//   tlsOptions: {
//     rejectUnauthorized: false
//   },
//   authTimeout: 3000
// }).once('error', function (err) {
//   console.log('Source Server Error:- ', err);
// });

// imap1.once('ready', function () {
//   imap1.openBox('INBOX', true, function (err, box) {
//     if (err) throw err;
//     console.log('message', 'Server Ready');
//   });
//   setInterval(function () {
//     getEmailFromInbox(imap1);
//   }, 3000);

// })


// imap1.connect();

// let k = 0;

imaps.connect(config).then(function (connection) {
  return connection.openBox('test').then(function () {
    var searchCriteria = ['1:*'];
    var fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
    };
    return connection.search(searchCriteria, fetchOptions).then(function (messages) {
      // messages.forEach(function (item) {
        // if(messages.length==0) length--;

        var item = messages[0];
        
        var all = _.find(item.parts, { "which": "" })
        var id = item.attributes.uid;
        console.log(id);
        var idHeader = "Imap-Id: " + id + "\r\n";
        console.log(idHeader);
        simpleParser(idHeader + all.body, (err, mail) => {
          // access to the whole mail object
          console.log("FROM---- " + mail.from.text)
          console.log("Subject---- " + mail.subject)
          console.log("Date---- " + mail.date)
          console.log("MAIL---- " + mail.text)



          var da = {
            from: mail.from.text,
            date: mail.date,
            subject: mail.subject,
            body: mail.text
          }
          var myData = new MailData(da);
          myData.save()
            .then(data => {
              console.log("data saved to database");
              // connection.deleteMessage(id);
            })
            .catch(err => {
              console.log("unable to send data");
            });

        });
      // });
    });
  });
});


// let getEmailFromInbox = (imap) => {
//   imap.openBox('INBOX', true, function (err, box) {
//     if (err) throw err;
//     var f = imap.seq.fetch('*', {
//       bodies: ['HEADER', 'TEXT'],
//       struct: true

//     });
    // f.on('message', function (msg, seqno) {
    //   var prefix = '(#' + seqno + ') ';
    //   if (k < seqno) {
    //     console.log('Message #%d', seqno);


    //     msg.on('body', function (stream, info) {
    //       var buffer = '';
    //       // var count = 0;
    //       stream.on('data', function (chunk) {
    //         // count += chunk.length;
    //         buffer = chunk.toString('utf8');
    //       });

    //       stream.once('end', function ( ) {
    //         var x = JSON.stringify(buffer);
    //         console.log('Data:    ', buffer );
    //         var da = {
    //           from: String,
    //           date: String,
    //           subject: String,
    //           body: x
    //         }
    //         var myData = new MailData(da);
    //         myData.save()
    //         .then(data=> {
    //           console.log("data saved to database");
    //         })
    //         .catch(err => {
    //           console.log("unable to send data");
    //         });

    //         if(myData.save()){
    //           // delete.buffer()
    //         }


    //       });
    //     });

    //     k = seqno;

    //   }

    // });

    // f.once('error', function (err) {
    //   console.log('Fetch error: ' + err);
    // });

//   });

// }





