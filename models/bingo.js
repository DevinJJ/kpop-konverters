var mongoose = require("mongoose");
 
var bingoSchema = new mongoose.Schema({
    name:String,
    instagram:String,
    selectedSquares: String
 
 
});
 
module.exports = mongoose.model("Bingo", bingoSchema);