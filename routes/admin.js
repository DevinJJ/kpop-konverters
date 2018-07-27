var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var User = require("../models/user");

//===============================================================================================
//Admin Login

//render register form
// router.get("/register", function(req, res){
//     res.render("register.ejs");
// });

// //Register Logic
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err)
//         {
//             console.log(err);
//             res.redirect("back");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/");
//         });
//     });
// });

//render login form
router.get("/login", function(req, res){
    res.render("login.ejs");
});

//handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect:"/dashboard",
    failureRedirect:"/login"
    
}), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


module.exports = router;