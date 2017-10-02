var Campground = require("../models/campground"),
    Comment = require("../models/comment"); 
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found"); 
            res.redirect("back");
        } else{
            // does the user own the campground?
            if(foundCampground.author.id.equals(req.user._id))
            {
                next(); 
                
            } else {
                req.flash("error", "You don't have to permission do that!");
                res.redirect("back"); 
            }
        }
    });
    } 
    else {
        res.redirect("back"); 
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment not found"); 
            res.redirect("back");
        } else{
            // does the user own the comment?
            if(foundComment.author.id.equals(req.user._id))
            {
                next(); 
                
            } else {
                req.flash("error", "You don't have to permission do that!");
                res.redirect("back"); 
            }
        }
    });
    } 
    else {
        req.flash("error", "You need to be logged in for that!");
        res.redirect("back"); 
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next(); 
    } else{
        req.flash("error", "You need to be logged in for that!");
        res.redirect("/login"); 
    }
}

middlewareObj.isSplashImage = function(req, res, next){
    if(req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
      next();
    }else {
      req.flash('error', 'Only images from images.unsplash.com allowed.\nSee https://youtu.be/Bn3weNRQRDE for how to copy image urls from unsplash.');
      res.redirect('back');
    }
}

module.exports = middlewareObj; 