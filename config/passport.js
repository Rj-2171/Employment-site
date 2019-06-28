var LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

var User =require('../models/modelblog');

module.exports=function(passport){
    
    passport.use(new LocalStrategy({usernameField:"email"},function(email,password,done){
        
        User.findOne({
            email:email            
        }).then(user=>{
            
            if(!user){
                return done(null,false);
            }
            bcrypt.compare(password,user.password,function(err,isMatch){
                if(err)
                {
                    console.log(err);

                }else if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false);
                }

            });
        });
        
        
    }))


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
         done(err, user);
      });
})
}

