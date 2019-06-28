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
     if(req.user.isStudent){
        res.redirect('/'+req.user.id+'/userprofile')
     } 
     else if(req.user.isCorporate){
        res.redirect('/'+req.user.id+'/corpprofile')
     } 
    
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
        successRedirect: '/userprofile',
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
     var bio=req.body.bio;
    console.log(req.body);
    
    if (req.files.image) {
        if (req.files.image) {
             cloudinary.uploader.upload(req.files.image.path, (result) => {
           
            var id=req.user._id;
      var query ={_id:req.user._id};
                   User.update(query,{$set:{ name: name, bio: bio , photo: result.url != null ? result.url :req.user.photo }} , function (err, user) {
         if(err) throw (err);
          else {
      console.log("A New Blog is created.",user);
      res.redirect('/'+id+'/userprofile')
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
      res.redirect('/'+id+'/userprofile')
    }
    })
             }
    }
    
});


route.get('/:id/userprofile',(req,res)=>{
    User.findById(req.params.id,function(err,result){
        if(err) return err;
        res.render('userprofile',{Users:result});
    })
});

route.post("/editcorp",multipartWare,(req,res)=>{
    var name=req.body.uname;
    var bio=req.body.bio;
   console.log(req.body);
   
   if (req.files.image) {
       if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
          
           var id=req.user._id;
     var query ={_id:req.user._id};
                  User.update(query,{$set:{ name: name, bio: bio , photo: result.url != null ? result.url :req.user.photo }} , function (err, user) {
        if(err) throw (err);
         else {
     console.log("A New Blog is created.",user);
     res.redirect('/'+id+'/corpprofile')
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
     res.redirect('/'+id+'/corpprofile')
   }
   })
            }
   }
   
});


route.get('/:id/corpprofile',(req,res)=>{
   User.findById(req.params.id,function(err,result){
       if(err) return err;
       res.render('corpprofile',{Users:result});
   })
});

module.exports=route;