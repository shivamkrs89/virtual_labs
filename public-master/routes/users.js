var express=require('express');
const { title } = require('process');
var router=express.Router();
var passport=require('passport');
var bcrypt=require('bcryptjs');
var auth=require('../config/auth');
//Get user model
var User = require('../models/user');
//Get Register
router.get('/register',function(req,res){
  res.render('index',{
    title:'Register'
  });
});
router.post('/register',function(req,res){
   var name=req.body.name;
   var email=req.body.email;
   var username=req.body.username;
   var password=req.body.password;
   var password2=req.body.password2;
   console.log(name);
   req.checkBody('name','name is required!').notEmpty();
   req.checkBody('email','email is required!').isEmail();
   req.checkBody('username','username is required!').notEmpty();
   req.checkBody('password','password is required!').notEmpty();
   req.checkBody('password2','Passwords do not match!').equals(password);
   var errors=req.validationErrors();
   if(errors)
   {
     res.render('register',{
       errors:errors,
       user:null,
       title:'Register'
     })
   }   
   else
   {
     User.findOne({'local.username':username},function(err,user){
       if(err)
       {
         console.log(err);
       }
        if(user)
        {
          req.flash('danger',"Username exists choose another")
          res.redirect('/users/index');
        }
        else
        {
          var user=new User();
          console.log(name);
            user.local.name=name;
            user.local.email=email,
            user.local.username=username,
            user.local.password=password,
            user.local.admin=1
          bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(user.local.password,salt,function(err,hash){
              if(err)
              console.log(err);
              user.local.password=hash;
              user.save(function(err){
                if(err)
                console.log(err);
                 else
                 {
                   //req.flash('success','You are now registered!')
                   res.redirect('/lab')
                 }                 
              })
            })
          })
        }
     })
   }
});
router.get('/login',function(req,res){
  if(res.locals.user)
  res.redirect('/');
  res.render('index',{
    title:'Log in'
  })
});
router.post('/login',function(req,res,next){
  console.log('login-try')
  passport.authenticate('local',{
  
    successRedirect:'/lab',
    failureRedirect:'/',
    failureFlash:true
  })(req,res,next);
});

router.get('/logout',function(req,res){
  req.logout();
  req.flash('success','You are logged out');
  res.redirect('/');
});
// facebook -------------------------------

        // send to facebook to do the authentication
        router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authenticated the user
        router.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/lab',
                failureRedirect : '/'
            }));


            

        router.get('/connect/facebook', passport.authorize('facebook', { scope : ['public_profile', 'email'] }));

            // handle the callback after facebook has authorized the user
        router.get('/connect/facebook/callback',
                passport.authorize('facebook', {
                    successRedirect : '/lab',
                    failureRedirect : '/'
                }));

//Exports
module.exports=router;