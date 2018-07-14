var mongoose = require("mongoose");
 
var bioSchema = new mongoose.Schema({
    name:String,
    paragraphOne:String,
    paragraphTwo:String,
    paragraphThree:String

 
 
});
 
module.exports = mongoose.model("Bio", bioSchema);