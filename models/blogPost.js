var mongoose = require("mongoose");
 
var blogPostSchema = new mongoose.Schema({
    title: String,
    picture: String,
    date: String,
    body: String,
    paragraphTwo: String,
    paragraphThree: String,
    paragraphFour: String,
    video: String,
    picCaption: String
 
 
});
 
module.exports = mongoose.model("BlogPost", blogPostSchema);