// config/auth.js
module.exports={
  ensureAuthenticated:function(req, res, next) {
    if (req.isAuthenticated()) { 
     return next();
    }
    return  res.redirect('/');
  }
}
// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
      'clientID'        : '184485093429094', // your App ID
      'clientSecret'    : '0c2f5e17bee17a8b12b5b6909d3897c4', // your App Secret
      'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
      'profileURL'      : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

  },

  'googleAuth' : {
      'clientID'         : '371130787356-7pf840iqv8p349elb6t627i83umosg3n.apps.googleusercontent.com',
      'clientSecret'     : 'Huw8cbmKSlPBO4bo-x9xCdWH',
      'callbackURL'      : 'http://localhost:3000/auth/google/callback'
  }

};


