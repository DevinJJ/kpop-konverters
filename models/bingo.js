var mongoose = require("mongoose");
 
var bingoSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    instagram:String,
    twitter:String,
    selectedSquares: String
 
 
});
 
module.exports = mongoose.model("Bingo", bingoSchema);