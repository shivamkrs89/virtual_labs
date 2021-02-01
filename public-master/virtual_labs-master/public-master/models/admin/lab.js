const express=require("express");
const mongoose =require("mongoose");
const labSchema=new mongoose.Schema({
  heading:{
    type:'String'

  },
  description:"String",
  link:{type:"String",default:'/'},
});
module.exports=mongoose.model('Lab',labSchema);
module.exports.StoreData=(newData,callback)=>{
    
  newData.save(callback)
}