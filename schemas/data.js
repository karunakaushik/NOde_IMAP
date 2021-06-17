var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    firstName: String,
    lastName: String

});

module.exports.dataSchema = dataSchema;