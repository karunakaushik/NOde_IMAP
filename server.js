const http = require('http');

const app = require('./app');

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

server.listen(port);
console.log(`............server is running at ${port}...... `);