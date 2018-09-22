var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var Bingo = require("./models/bingo");
var Subscriber = require("./models/subscriber");
var Message = require("./models/message");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var adminRoutes = require("./routes/admin");
var indexRoutes = require("./routes/index");
var bingoRoutes = require("./routes/bingo");
var aboutRoutes = require("./routes/about");
var contactRoutes = require("./routes/contact");

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

app.use(adminRoutes);
app.use(indexRoutes);
app.use(bingoRoutes);
app.use(aboutRoutes);
app.use(contactRoutes);



//Store Routes =========================================================================================================
app.get("/store", function(req, res){                                            //render kpop store
   res.render("store.ejs");
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
                        Subscriber.find({}, function(err, allSubs){
                           if(err)
                           {
                               console.log(err);
                           }
                           else
                           {
                               res.render("dashboard.ejs", {messages:allMessages, bingos:allBingos, subs:allSubs});
                           }
                        });
                    }
                });
               
            }
     });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Serving KpopKonverters");
});