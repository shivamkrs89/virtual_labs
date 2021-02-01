var express=require("express");
var router=express.Router();
var Lab=require('../models/admin/lab');
var bodyParser = require('body-parser');

router.get('/labAdmin',(req,res)=>{
    res.render('labAdmin');
})
router.post('/labAdmin',(req,res)=>{
    var heading=req.body.value;
    var description=req.body.description;
    var link=req.body.link;
    console.log(description);
    var LabData=new Lab();
    LabData.heading=heading;
    LabData.description=description;
    LabData.link=link;
    Lab.StoreData(LabData,(err,LabData)=>{
        if(err)throw err;
        console.log(LabData);
    })

})
router.get('/editLabAdmin',(req,res)=>{
    res.render('editLabAdmin');
})
router.post('/editLabAdmin',(req,res)=>{
    console.log(req.body.id);
    Lab.findById(req.body.id).exec((err,result)=>{
        if(err)throw err;
        res.send(result).json;
    })
})
router.post('/update',(req,res)=>{
    var id=req.body.id;
    console.log(id);
    Lab.findByIdAndUpdate(id,{link:req.body.link,heading:req.body.optradio,description:req.body.description},function(err,result){
        if(err){
            res.send(err);
        }
        else{
            console.log("Updated successfully",result)
            res.redirect('labAdmin');
        }
    });
})
module.exports = router;