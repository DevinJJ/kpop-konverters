var express = require("express");
var router = express.Router();
// var passport = require("passport");
// var LocalStrategy = require("passport-local");
// var bodyParser = require("body-parser");
// var User = require("../models/user");
var Message = require("../models/message");

//Contact Routes============================================================================================================
router.get("/contact", function(req, res){                                            //render contact page
   res.render("contact.ejs");
});

router.post("/contact", function(req, res){
    var name = req.body.name;
    var body = req.body.body;
    var email = req.body.email;
    
    var newMessage = {name:name, body:body, email:email};
       Message.create(newMessage, function(err, newlyCreated){
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.redirect("/contact");
       }
    });
});


module.exports = router;