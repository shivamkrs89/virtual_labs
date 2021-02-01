
var mongoose=require('mongoose');
var UserSchema=mongoose.Schema({
  local          : {
          name: String,//{type:String,require:true},
          email:String,//required:true},
          username:String,//required:true},
          password:String,// required:true},
          admin:Number,
          image:{type:String,default:"image-1603183764252.png"}
      },
  facebook       : {
          id           : String,
          token        : String,
          name         : String,
          email        : String
      },
  google         : {
          id           : String,
          token        : String,
          email        : String,
          name         : String
      }
});
var User=module.exports=mongoose.model('User',UserSchema)