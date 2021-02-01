var express=require("express");
var Lab=require("../models/admin/lab")
var router=express.Router();
const nodemailer = require('nodemailer');
var PublishLab=require('../models/publish_lab');
const passport=require("passport");
var auth1=require('../config/auth1');
const isLoggedIn=auth1.isLoggedIn;
router.get('/',(req,res)=>{
    res.render('home');
})
router.get('/index',(req,res)=>{
  res.render('index');
})
router.get('/team',isLoggedIn,(req,res)=>{
    res.render('team');
})
router.get('/resorces',(req,res)=>{
    res.render('resorces');
})
router.get('/lab',(req,res)=>{
    res.render('lab');
    
})

router.get('/data',(req,res)=>{
    Lab.find({},(err,result)=>{
        if(err)throw err;
        res.send(result).json;
    })
})
router.post('/filter',(req,res)=>{
    Lab.find({heading:req.body.course}).exec((err,result)=>{
        if(err)throw err;
        res.send(result).json;
    })
})
router.get('/contact',(req,res)=>{
    res.render('contact');
})
router.get('/profile',(req,res)=>{
    res.render('profile');
})








router.post('/publish_lab',isLoggedIn,(req,res)=>{
    console.log(req.body.inst_name);
    console.log(req.body.branch_name);
    var inst_name=req.body.inst_name;
  //var email = req.body.email; is the email of the user
  var email='rawabhishek5@gmail.com'; //user's/publisher's email
  var branch_name=req.body.branch_name;

  var emailMessage = `Hi there,\n\nThank you for your request to publish lab.\n\nYour email is: ${email}.\n\nYour institute is: ${inst_name} \n You are requesting to publish lab related to ${branch_name}\n\n Our Team will contact you within few days asking your lab details`;
  console.log('request contact');
  console.log(req.body)
 

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vlabs2021@gmail.com',
      pass: 'HelloLabs@2021'
    }
  });

  var emailOptions = {
    from: 'vlabs2021@gmail.com',
    to: email,
    subject: 'Publishing Lab',
    text: emailMessage
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send('contact sent error');
    } else {
      console.log('Message Sent: ' + info.response);
      console.log('Email Message: ' + emailMessage);
      
      PublishLab.find({'publisher_mailID':email}, function(err) {
        if (err) {
          console.error('error, no entry found');
        }
        const publishers = new PublishLab();
        publishers.publisher_mailID = email;
        publishers.inst_name = req.body.inst_name;
        publishers.branch_name=req.body.branch_name;
        console.log(publishers);
        publishers.save();

        res.send('Email sent and saved to db');
      })
    }
  });
})
module.exports = router;
