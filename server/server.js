require("./models/db");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const conversion = require("./exceltojson");
const mongo_oper = require("./mongodb_operations");
const { response, urlencoded } = require("express");
const connect = require("./models/db");
const Round1 = require("./models/Round1model");
//const User = require("./models/UserModel");
const cookie= require('cookie');
require("dotenv").config();
const app = express();
var loggedin="false";
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


// function isLoggedIn(req,res,next){
//   if (loggedin=="true") {
//     return next(); 
//   } else {
//     res.redirect("/"); 
//   }
// }
// app.all('/admins/*', function (req, res, next) {
//   if (loggedin=="true") {
//     console.log("ggg");
//     res.setHeader('Set-Cookie',cookie.serialize('name','admin',{
//       maxAge: 30*30*30,
      
//     }));
    
//     console.log("cookie set");
//      next(); 
//   } 
 
//   else {
//     console.log("ddd")
//     res.redirect("/"); 
//   }
// })

app.get('/admins/adminhome',(req,res)=>{
      res.redirect("admin.html");
   
});

app.post("/login", (req,res)=>{
  if(req.body.username == 'shruthii1410@gmail.com' && req.body.password =="password"){
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
  console.log(req.body);
  res.redirect("quiz.html");
});

app.post("/onupload", upload.single("quizques"), (req, res) => {
  console.log("in upload");
  console.log(req.file.filename);
  converted_data = conversion(req.file.filename);
  console.log(converted_data);
  Round1.create(converted_data).then(function (round1) {
    mongo_oper.first(connect.getConnection, converted_data);
    res.send(rd1);
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

app.post("/takequiz", (req, res) => {
  console.log(req.body);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started"));
