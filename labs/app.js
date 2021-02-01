var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var config=require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var passport=require('passport');
const index=require('./routes/index');
const labAdmin=require('./routes/labAdmin');
// connect to database
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongodb');
  mongoose.set('useFindAndModify', false);

});

//initializing app;
var app=express();
// View engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
// setting public folder
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(path.join(__dirname,'public')));

// Set global error variable
app.locals.errors=null;

// body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
 // cookie: { secure: true }
}))
//Express-validator middleware
app.use(expressValidator({
  errorFormatter:function(param,msg,value)
  {
    var namespace=param.split('.')
    ,root=namespace.shift()
    ,formParam=root;

    while(namespace.length)
    {
      formParam+='['+namespace.shift()+']';
    }
    return{
      param:formParam,
      msg:msg,
      value:value
    };
  }
}));

//Express messages  middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Passport config
require('./config/passport')(passport);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//MAke var user globally available-
app.get('*',function(req,res,next){
       res.locals.user=req.user||null;
       next();
});
// google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================
             // locally --------------------------------
        app.get('/connect/local', function(req, res) {
          res.render('connect-local.ejs', { message: req.flash('loginMessage') });
      });
      app.post('/connect/local', passport.authenticate('local-signup', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));
          app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

          // the callback after google has authorized the user
          app.get('/connect/google/callback',
              passport.authorize('google', {
                  successRedirect : '/profile',
                  failureRedirect : '/'
              }));

                      // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

//set routes
var users=require('./routes/users.js')
app.use(index);
app.use('/users',users);
app.use('/admin',labAdmin);
var port=3000;
app.listen(port,function(){
  console.log('server started on port'+port);
});
