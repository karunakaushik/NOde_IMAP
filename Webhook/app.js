const express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
//router.......
const connectroute = require('./router/connect')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//hello world.......
app.get("/", (req, res) => {
    res.send("Hello Server2");
});

app.use('/connect', connectroute);


axios.get('http://localhost:3000/product')
    .then(function (response) {
        // handle success
        console.log(response.data);
        console.log("connected to server1")
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    // .then(function () {
    //     // always executed
    // });



module.exports = app;