const http = require('http');

const app = require('./app');

require('dotenv').config();


//DataBase connection here..........
const mongoose = require('mongoose');

mongoose.connect( process.env.DATABASE_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }).then(()=>{
    console.log(`...Database connected!...`)
}).catch((err)=> console.log(`No connection!...`))

// use .env file...............
require('dotenv').config();
const port = process.env.PORT;

// send email from one gmail to another gmail................
const sendEmail = require('./sendEmail');
console.log("Email Sent ...........");

// retrive email from gmail using IMAP.............
const imapEmail = require('./imap');
console.log("...IMAP DONE.....");

// create server ...........
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`............server is running at ${port}...... `)
});
