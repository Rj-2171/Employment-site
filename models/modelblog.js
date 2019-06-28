const mongoose = require("mongoose");



var regSchema = new mongoose.Schema({ 
    uname:String,
    email:String,
    bio:String,
    photo:String,
    password:String,
    isStudent:{
        type:Boolean,
        default:false
    },
    isCorporate:{
        type:Boolean,
        default:false
    }
     
});



module.exports=mongoose.model("Users",regSchema);