const mongoose = require("mongoose");



var jobSchema = new mongoose.Schema({ 
    title:String,
    location:String,
    discription:String,
    skills:Array
});



module.exports=mongoose.model("Job",jobSchema);