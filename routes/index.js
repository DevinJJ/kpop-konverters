var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var User = require("../models/user");
var BlogPost = require("../models/blogPost");
var Subscriber = require("../models/subscriber");



router.delete("/blog/:id", function(req, res){                                      //DELETE
    BlogPost.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            res.redirect("/");
        }
        else
        {
            res.redirect("/");
        }
    });
});

router.get("/newpost", function(req, res){                                          //RENDER NEWPOST
   res.render("newBlogPost.ejs"); 
});

router.post("/", function(req, res){                                                 //MAKE NEWPOST

    var title = req.body.title;
    var body = req.body.body;
    var para2 = req.body.para2;
    var para3 = req.body.para3;
    var para4 = req.body.para4;
    var picture = req.body.picture;
    var video = req.body.video;
    var picCaption = req.body.picCaption;
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var hh = today.getHours();
    var yy = today.getFullYear();
    
    if(hh < 6)
    {
        dd = dd -1;
    }
    var date = mm + "/" + dd + "/" + yy;
    
    
    var newPost = {title:title, body:body, picture:picture, date:date, video:video, picCaption:picCaption, paragraphTwo:para2, paragraphThree:para3, paragraphFour:para4};
   BlogPost.create(newPost, function(err, newlyCreated){
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

router.get("/", function(req, res){                                                  //RENDER HOME
    
     BlogPost.find({}, function(err, allPosts){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render("home.ejs", {blogs:allPosts});
            }
     });

});

router.get("/blog/:id/edit", function(req, res){                                     //RENDER EDIT FORM
      BlogPost.findById(req.params.id, function(err, foundBlog){
        if(err)
        {
            res.redirect("/");
        }
        else
        {
            res.render("edit.ejs", {blog:foundBlog});
        }
    });
});

router.put("/blog/:id", function(req, res){
    BlogPost.findByIdAndUpdate(req.params.id, req.body.blog, function(err, foundBlog){
        if(err)
        {
            res.redirect("/");
        }
        else
        {
            res.redirect("/");
        }
    });
});

router.post("/subscriber", function(req, res){
   Subscriber.create({email:req.body.email}, function(err, newlyCreated){
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




module.exports = router;