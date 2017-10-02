var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"), 
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"), 
    flash = require("connect-flash"), 
    Comment = require("./models/comment"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    methodOverride        = require("method-override"); 
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"), 
    indexRoutes = require("./routes/index"); 

mongoose.connect(process.env.DATABASEURL); 
//mongoose.connect("mongodb://abhishek:illmatic519@ds157584.mlab.com:57584/campfire519");
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); 
app.locals.moment = require('moment');
//seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "hello my name is abhishek",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
    next(); 
}); 

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes); 

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!"); 
});