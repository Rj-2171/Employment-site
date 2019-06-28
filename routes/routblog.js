var express = require("express");
 

const passport = require('passport');
var middleware = require('../middleWare/middleware')
var bcrypt=require("bcryptjs");
var route = express.Router();
 const multipart = require('connect-multiparty');
 const cloudinary = require('cloudinary');
const multipartWare = multipart()
var User = require("../models/modelblog");



route.get("/",(req,res) =>{
    res.render("Home");
});

route.get("/reg_corp", (req,res) =>{
    res.render("reg_corp");
});

route.get("/reg_student", (req,res) =>{
    res.render("reg_student");
});

route.get("/login", (req,res) =>{
    res.render("login");
});

route.get("/register", (req,res) =>{
    res.render("register");
});
route.get("/jobs", (req,res) =>{
    res.render("jobs");
});


route.get("/jobpost",(req,res) =>{
    res.render("jobpost");
});

route.get("/userprofile",(req,res) =>{
    res.render("userprofile");
});

route.get("/corpprofile",(req,res) =>{
    res.render("corpprofile");
});
// Sendong data to DB.......
//Student....
route.post("/reg_student",(req,res) =>{  
    const{ uname,email,password }=req.body;
    const isStudent=true;
    
    User.findOne({email:email}).then(user=>{
        if(user)
            res.render('/reg');
        else{
            const newUser =new User({
                uname,
                email,
                password,
                isStudent
             
            });
            
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save()
            .then(user=>{
                res.redirect('/reg_done');
            })
            .catch(err=>console.log(err));
            });
        });
        }
    });
});
//Corporate....
route.post("/reg_corp",(req,res) =>{  
    const{ uname,email,password }=req.body;
    const isCorporate=true;
    
    User.findOne({email:email}).then(user=>{
        if(user)
            res.render('/reg');
        else{
            const newUser =new User({
                uname,
                email,
                password,
                isCorporate
             
            });
            
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save()
            .then(user=>{
                res.redirect('/reg_done');
            })
            .catch(err=>console.log(err));
            });
        });
        }
    });
});

//Login....
route.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/log_done',
        failureRedirect:'/login',
    })(req,res,next);

});

//Logout....
route.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login');
});

route.post("/editstudent",multipartWare,(req,res)=>{
     var name=req.body.uname;
      
     var bio=req.body.email;
    
    

        if (req.files.image) {
             cloudinary.uploader.upload(req.files.image.path, (result) => {
           
            var id=req.user._id;
      var query ={_id:req.user._id};
                   User.update(query,{$set:{ uname: name, bio: bio , photo: result.url != null ? result.url :req.user.photo }} , function (err, user) {
         if(err) throw (err);
          else {
      console.log("A New Blog is created.",user);
      res.redirect('/user/'+id+'/account')
    }
    })
                 
            },{
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
             }else {
 
                   User.update(query,{$set:{ name: name, bio: bio , photo:''}} , function (err, user) {
         if(err) throw (err);
          else {
      console.log("A New Blog is not created.",user);
      res.redirect('/user/'+id+'/account')
    }
    })
             }
    });
    


module.exports=route;