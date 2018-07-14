var mongoose = require("mongoose");
 
var messageSchema = new mongoose.Schema({
    name:String,
    email:String,
    body: String
 
});
 
module.exports = mongoose.model("Message", messageSchema);