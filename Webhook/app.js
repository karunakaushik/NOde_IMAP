const express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();

//router.......
const connectroute = require('./router/connect');

// DATA SCHEMA.............
const { emailSchema } = require('./schemas/email');
const EmailDetails = mongoose.model("EmailDetail", emailSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//hello world.......
app.get("/", (req, res) => {
    res.send("Hello Server2");
});


app.post("/email", (req, res) => {
    console.log(req.body);
    var myEmailData = new EmailDetails(req.body);
    myEmailData.save()
        .then(data => {
            console.log("data saved to database");
        })
        .catch(err => {
            console.log("unable to send data");
        });
    res.send("ok");
});

app.use('/connect', connectroute);


// axios.get('http://localhost:3000/product')
//     .then(function (response) {
//         // handle success
//         console.log(response.data);
//         console.log("connected to server1")
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
// .then(function () {
//     // always executed
// });

// axios.post('http://localhost:3000/product')
//     .then(function (response) {
//         // handle success
//         console.log(response.data);
//         console.log("connected to server1")
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })


module.exports = app;