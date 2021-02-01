const express=require("express");
const mongoose =require("mongoose");
var publishLabSchema= new mongoose.Schema(
    {
      publisher_mailID: String,
      inst_name: String,
      branch_name:String,
      time : { type : Date, default: Date.now }
    }
  )
  module.exports=mongoose.model('PublishLab',publishLabSchema);