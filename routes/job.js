var express = require("express");
var router = express.Router();
var Job = require("../models/job");
 

 

router.get( "/:id/jobs",(req,res) =>{

    Job.findById(req.params.id,function(err,job){
        if(err) return err;        
        res.render('jobs',{Jobs:job});
     

    })
})

router.get( "/browse",(req,res) =>{

    Job.find({},(err,result)=>{
        if(err) return err;
     res.render('browse',{Job:result});

    })
})



 

router.get( "/userprofile",(req,res) =>{

    User.find({},(err,result)=>{
        if(err) return err;
     res.render('userprofile',{user:result});

    })
})



// Sendong data to DB.......
router.post("/jobpost",(req,res) =>{  
const newJob = new Job(req.body);
        newJob.save()
        .then(item=>{
            console.log(req.body);
            
      res.send("item saved to database" + item);
    })
        .catch(err=>{
            
            console.log(err);
            res.status(400).send("Unable to Post");
        })
    
});



module.exports=router;