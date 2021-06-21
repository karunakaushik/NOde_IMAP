const http = require('http');
// const express = require('express');
const app = require('./app');

const port = 8000;

// create server ...........
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`............server2 is running at ${port}...... `)
});
