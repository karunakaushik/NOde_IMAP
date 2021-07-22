// const { text } = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mailSchema = new Schema({
    from: String,
    date: String,
    subject: String,
    body: String
    
});

module.exports.mailSchema = mailSchema;