const http = require('http');
// const express = require('express');
const app = require('./app');

//Database connection..........
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`...Database connected!...`)
}).catch((err) => console.log( err ));

//Port Numebr........
const port = 8000;

// create server ...........
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`............server2 is running at ${port}...... `)
});
