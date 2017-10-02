var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user"); 

//======== ROUTES

router.get("/", function(req,res){
    res.render("landing"); 
}); 

/// AUTH ROUTES

router.get("/register", function(req, res) {
    res.render("register"); 
}); 

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username}); 
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to CampFire " + user.username);
           res.redirect("/campgrounds");
        });
    });
}); 

router.get("/login", function(req, res) {
    res.render("login"); 
}); 

router.post("/login", passport.authenticate("local", 
    {
         successRedirect:"/campgrounds", 
         failureRedirect:"/login"}), 
     function(req, res){
    
}); 

// add logout route

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds"); 
}); 


module.exports = router; 