var express = require("express");
var mongoose = require("mongoose");
var cloudinary = require("cloudinary");
var session = require('express-session') 
var bodyParser = require("body-parser");
var passport = require("passport")
var bcrypt=require("bcryptjs");
var app = express();
var port = 3000;
/** configure cloudinary */
cloudinary.config({
    cloud_name: 'vepsun',
    api_key: '766642139621944',
    api_secret: '6vH5drI5zD-I399t-JbVnVQH7uE'
});
mongoose.Promise=global.Promise;

mongoose.connect("mongodb+srv://DB:bwuBiimQZ8f5AXk@cluster0-vucli.mongodb.net/test?retryWrites=true&w=majority",()=>{
    console.log("MongoDB connected")
});
app.use(session({
    secret: 'Dobaramatpuchana12314',
    resave: true,
    saveUninitialized: true,
     
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine' , 'ejs');
app.use('/assets',express.static('assets'));


require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


var user = require("./routes/routuser");
var job = require("./routes/job");
app.use(user);
app.use(job);
 

app.listen(port,() =>{
    console.log("server is listening on port "+ port);
});
