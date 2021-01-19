const express=require("express");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const cors=require("cors");
const path=require("path");
var app=express();
const home=require('./routes/home');
const labRoutes=require('./routes/lab');
const PORT=process.env.PORT||8000;
//middleWares
app.use(express.static('public'));
app.use(bodyParser.json());

//routes
app.use(home);
app.use(labRoutes);

//PORT
app.listen(PORT,()=>{
    console.log("We are connected with PORT 8000")
})