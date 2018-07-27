var express = require("express");
var router = express.Router();
// var passport = require("passport");
// var LocalStrategy = require("passport-local");
// var bodyParser = require("body-parser");
// var User = require("../models/user");
var Bio = require("../models/bio");


//About Page =====================================================================================================================
router.get("/about", function(req, res){
     Bio.find({}, function(err, allBios){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render("about.ejs", {bios:allBios});
            }
     }); 
});

router.post("/about", function(req, res){
    var name = req.body.name;
    var body = req.body.body;
    
    var newBio = {name:name, paragraphOne:body};
     Bio.create(newBio, function(err, newlyCreated){
      if(err)
      {
          console.log(err);
      }
      else
      {
          res.redirect("/");
      }
  }); 
});

router.get("/about/:id/edit", function(req, res){
        Bio.findById(req.params.id, function(err, foundBio){
        if(err)
        {
            res.redirect("/");
        }
        else
        {
            res.render("editBio.ejs", {bio:foundBio});
        }
    });
});

router.put("/about/:id", function(req, res){
    Bio.findByIdAndUpdate(req.params.id, req.body.bio, function(err, foundBio){
        if(err)
        {
            res.redirect("/");
        }
        else
        {
            res.redirect("/about");
        }
    });
});



module.exports = router;