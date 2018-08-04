var express = require("express");
var router = express.Router();
// var passport = require("passport");
// var LocalStrategy = require("passport-local");
// var bodyParser = require("body-parser");
// var User = require("../models/user");
var Bingo = require("../models/bingo");

//===============================================================================================

//BINGO ROUTES ====================================================================================================


router.get("/bingo", function(req, res){
    res.render("bingoForm.ejs");
});

router.post("/bingo", function(req, res){
    var name = req.body.name;
    var instagram = req.body.instagram;
    var selectedSquares = req.body.selectedSquares;
    
        var newBingo = {name:name, instagram:instagram, selectedSquares:selectedSquares};
       Bingo.create(newBingo, function(err, newlyCreated){
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.render("submitted.ejs", {selectedSquares:selectedSquares});
       }
   }); 
});

router.delete("/bingo/:id", function(req, res){                                      //DELETE
    Bingo.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            res.redirect("/");
        }
        else
        {
            res.redirect("/dashboard");
        }
    });
});


module.exports = router;