var LocalStrategy=require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var User=require('../models/user');
var passport=require('passport');
var bcrypt=require('bcryptjs');
var configAuth = require('./auth');
module.exports=function(passport) {
  passport.serializeUser(function(req,user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
User.findById(id,function(err,user){
 done(err,user);
});
});
     passport.use(new LocalStrategy(function(username,password,done){
           User.findOne({'local.username' : username},function(err,user){
                if(err)
                console.log(err);
                if(!user)
                {
                  return done(null,false,{message:'No user found'});
                }

                bcrypt.compare(password,user.local.password,function(err,isMatch){
                          if(err)
                          console.log(err)

                          if(isMatch)
                          {
                            return done(null,user);
                          }
                          else
                          {
                            return done(null,false,{message:'Wrong Password.'})
                          }

                });
           });
     }));

    
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL,
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

  },
  function(req, token, refreshToken, profile, done) {

      // asynchronous
      process.nextTick(function() {

          // check if the user is already logged in
          if (!req.user) {

              User.findOne({ 'google.id' : profile.id }, function(err, user) {
                  if (err)
                      return done(err);

                  if (user) {

                      // if there is a user id already but no token (user was linked at one point and then removed)
                      if (!user.google.token) {
                          user.google.token = token;
                          user.google.name  = profile.displayName;
                          user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                          user.save(function(err) {
                              if (err)
                                  return done(err);
                                  
                              return done(null, user);
                          });
                      }

                      return done(null, user);
                  } else {
                      var newUser          = new User();

                      newUser.google.id    = profile.id;
                      newUser.google.token = token;
                      newUser.google.name  = profile.displayName;
                      newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                      newUser.save(function(err) {
                          if (err)
                              return done(err);
                              
                          return done(null, newUser);
                      });
                  }
              });

          } else {
              // user already exists and is logged in, we have to link accounts
              var user               = req.user; // pull the user out of the session

              user.google.id    = profile.id;
              user.google.token = token;
              user.google.name  = profile.displayName;
              user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

              user.save(function(err) {
                  if (err)
                      return done(err);
                      
                  return done(null, user);
              });

          }

      });

  }));
  exports.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
      next();
    }
    else
    {
      req.flash('danger','Please login');
      res.redirect('/');
    }
  }
  exports.isAdmin=function(req,res,next){
    if(req.isAuthenticated() && res.locals.user.admin==1)
    {
      next();
    }
    else
    {
      req.flash('danger','Please log in as admin')
      res.redirect('/users/login');
    }
  }
}