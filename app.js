const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
//data Schema.........
const { dataSchema } = require('./schemas/data');
const User = mongoose.model("User", dataSchema);

const app = express();
//router.......
const productRoute = require('./api/routes/product');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//hello world.......
app.get("/", (req, res) => {
    res.send("Hello World");
});
//form view.........
app.use("/form", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use('/product', productRoute);



// route to post data to database.......
app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(data => {
            res.send("Data saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });

});


// app.get("/maildata", (req, res) =>{
//     res.send()
// })


module.exports = app;