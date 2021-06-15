const express = require('express');

const app = express();

const productRoute = require('./api/routes/product');


//middleware
app.use('/product', productRoute);

module.exports= app;