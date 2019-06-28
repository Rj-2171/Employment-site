// all the middleare goes here
var middlewareObj = {};


middlewareObj.isstudent = function(req, res, next){
    
    if(req.isAuthenticated()){
       if(req.user.isStudent){
        return next();
       }
        
    }
//    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.iscorp = function(req, res, next){
    
    if(req.isAuthenticated()){
       if(req.user.isCorporate){
         res.redirect("/corpdash");
        return next();
       }
        
    }
   
    res.redirect("/login");
}
module.exports = middlewareObj;
