const express=require("express");
const mongoose =require("mongoose");
var feedbackSchema= new mongoose.Schema(
    {
      email:String,
      stars:String,
      description:String
    }
  )
 module.exports=mongoose.model('feedback',feedbackSchema);