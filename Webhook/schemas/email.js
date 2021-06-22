var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var emailSchema = new Schema({
    from: String,
    body: String,
    subject: String,
    
});

module.exports.emailSchema = emailSchema;