require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology : true}, err=>{
    if(err) {return console.error(err);} 
    console.log("MongoDB connection successful");
});

exports.getConnection = mongoose.connection;


require("./Round1model");