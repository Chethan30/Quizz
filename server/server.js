require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const {Round1conversion,Round2conversion} = require("./exceltojson");
const mongo_oper = require("./mongodb_operations");
const { response, urlencoded } = require("express");
const connect = require("./models/db");
const Round1 = require("./models/Round1model");
const cookie= require('cookie');
var bp = require('body-parser');

const app = express();
var loggedin="false";
var studentdetails=[];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  },
});
const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use('/admins',express.static("admin"));


function isLoggedIn(req,res,next){
  if (loggedin=="true") {
    return next(); 
  } else {
    res.redirect("/"); 
  }
}


app.get('/admins/adminhome',isLoggedIn,(req,res)=>{
      res.redirect("admin.html");
});

app.post("/login", (req,res)=>{
  if(req.body.username == 'shruthii1410@gmail.com' && req.body.password =="password"){
    loggedin="true";
    res.setHeader('Set-Cookie',cookie.serialize('name','admin',{
        maxAge: 30*30*30,
            
        }));
    res.redirect('/admins/adminhome');
  }
  else{
  res.redirect('/');
  }
}
);


app.post("/registrationdone", (req, res) => {
  studentdetails.push(req.body);
  res.redirect("instructions.html");
});

app.post("/admins/onupload",isLoggedIn, upload.single("quizques"), (req, res) => {
  console.log("in upload");
  console.log(req.file.filename);
  converted_data = Round1conversion(req.file.filename);
  console.log(converted_data);
  Round1.create(converted_data).then(function (round1) {
    mongo_oper.first(connect.getConnection, converted_data);
    res.redirect('/admins/adminhome');
  });
});

app.get("/takequiz", (req, res) => {
  console.log("in get");
  mongo_oper
    .second(connect.getConnection)
    .then(function (r) {
      console.log("resolved");
      res.json(r);
    })
    .catch(function (err) {
      console.log("erroeserves" + err);
      res.send(err);
    });
});


app.post('/round1',(req,res)=>{
  studentdetails.push(JSON.parse(JSON.stringify(req.body)));
  console.log(studentdetails)
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server started"));
