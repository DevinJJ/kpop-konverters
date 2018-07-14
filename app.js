var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var BlogPost = require("./models/blogPost");
var Bingo = require("./models/bingo");
var Bio = require("./models/bio");
var Message = require("./models/message");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://devin:lego2500@ds137631.mlab.com:37631/thekpopkonverters");
// mongoose.connect("mongodb://localhost/kpop_konverters");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"toppermost of the poppermost",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


// Bio.create({name:"Bio Header", paragraphOne:"Write your Bio here!"}, function(err, newlyCreated){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("Made Bio");
//     }
// });



//END DECLARATIONS===================================================================================

//HOME ROUTES========================================================================================

app.delete("/blog/:id", function(req, res){                                      //DELETE
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

app.get("/newpost", function(req, res){                                          //RENDER NEWPOST
   res.render("newBlogPost.ejs"); 
});

app.post("/", function(req, res){                                                 //MAKE NEWPOST

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

app.get("/", function(req, res){                                                  //RENDER HOME
    
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

app.get("/blog/:id/edit", function(req, res){                                     //RENDER EDIT FORM
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

app.put("/blog/:id", function(req, res){
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

//BINGO ROUTES ====================================================================================================
app.get("/bingo", function(req, res){
    res.render("bingoForm.ejs");
});

app.post("/bingo", function(req, res){
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
           res.redirect("/");
       }
   }); 
});

//Store Routes =========================================================================================================
app.get("/store", function(req, res){                                            //render kpop store
   res.render("store.ejs");
});

//Contact Routes============================================================================================================
app.get("/contact", function(req, res){                                            //render contact page
   res.render("contact.ejs");
});

app.post("/contact", function(req, res){
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


app.get("/dashboard", function(req, res){

     Bingo.find({}, function(err, allBingos){
            if(err)
            {
                console.log(err);
            }
            else
            {
                Message.find({}, function(err, allMessages){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        res.render("dashboard.ejs", {bingos:allBingos, messages:allMessages});
                    }
                });
               
            }
     });
});

app.delete("/bingo/:id", function(req, res){                                      //DELETE
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

//About Page =====================================================================================================================
app.get("/about", function(req, res){
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

app.post("/about", function(req, res){
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

app.get("/about/:id/edit", function(req, res){
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

app.put("/about/:id", function(req, res){
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

//Register Routes =============================================================================================================
app.get("/register", function(req, res){                                         //Render Register page
    res.render("register.ejs");
});

app.post("/register", function(req, res){                                        //Register User
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err)
        {
            console.log(err);
            res.redirect("back");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});

app.get("/login", function(req, res){                                            //render login form
    res.render("login.ejs");
});


app.post("/login", passport.authenticate("local", {                                 //handle login logic
    successRedirect:"/",
    failureRedirect:"/login"
    
}), function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Serving KpopKonverters");
});