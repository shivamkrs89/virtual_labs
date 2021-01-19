const express =require('express');
const router =express.Router();

router.get('/lab',(req,res)=>{
    res.send("Lab file");
});
module.exports=router;