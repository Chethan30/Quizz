require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const {
  Round1conversion,
  Round2conversion,
  Round3conversion,
} = require("./exceltojson");
const mongo_oper = require("./mongodb_operations");
const { response, urlencoded } = require("express");
const connect = require("./models/db");
const Round1 = require("./models/Round1model");
const Round2 = require("./models/Round2model");
const Round3 = require("./models/Round3model");
const cookie = require("cookie");
const fs = require("fs");
const https = require("https");
var request = require('request');
const app = express();
var loggedin = "false";
var studentdetails = [];
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

app.use("/admins", express.static("admin"));

function isLoggedIn(req, res, next) {
  if (loggedin == "true") {
    return next();
  } else {
    res.redirect("/");
  }
}

app.get("/admins/adminhome", isLoggedIn, (req, res) => {
  res.redirect("admin.html");
});

app.post("/login", (req, res) => {
  if (
    req.body.username == "shruthii1410@gmail.com" &&
    req.body.password == "password"
  ) {
    loggedin = "true";
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("name", "admin", {
        maxAge: 30 * 30 * 30,
      })
    );
    res.redirect("/admins/adminhome");
  } else {
    res.redirect("/");
  }
});

app.post("/registrationdone", (req, res) => {
  studentdetails.push(req.body);
  res.redirect("instructions.html");
});

app.post(
  "/admins/onupload",
  isLoggedIn,
  upload.single("quizques"),
  (req, res) => {
    var r1 = 0,
      r2 = 0,
      r3 = 0;
    console.log("in upload");
    console.log(req.file.filename);
    converted_data1 = Round1conversion(req.file.filename);
    converted_data2 = Round2conversion(req.file.filename);
    converted_data3 = Round3conversion(req.file.filename);
    console.log(converted_data3);
    // let ress;
    Round1.create(converted_data1).then(function () {
      mongo_oper
        .first(connect.getConnection, converted_data1)
        .then(function () {
          console.log("r1");
          r1 = 1;
        });
    });
    Round2.create(converted_data2).then(function (round2) {
      mongo_oper
        .Round2insert(connect.getConnection, converted_data2)
        .then(function () {
          console.log("r2");
          r2 = 1;
        });
    });
    Round3.create(converted_data2).then(function (round3) {
      mongo_oper
        .Round3insert(connect.getConnection, converted_data3)
        .then(function () {
          console.log("r3");
          r3 = 1;
        });
    });

    var stop = setInterval(() => {
      console.log("r1==" + r1 + "r2==" + r2 + "r3==" + r3);
      if (r1 == 1 && r2 == 1 && r3 == 1) {
        clearInterval(stop);
        mongo_oper
          .getRound3Questions(connect.getConnection)
          .then(function (r) {
            var arr =r;
            for (var i = 0; i < arr.length; i++) {
              saveImageToDisk(
                arr[i].Images,
                "./public/round3images/" + i + ".jpg",
                i
              );
            }
            function saveImageToDisk(url, path, i) {
              var fullUrl = url;
              console.log(fullUrl);
              var localPath = fs.createWriteStream(path);
              var r = https.get(fullUrl, function (response) {
                console.log(i);
                response.pipe(localPath);
                
              })
            }
          })
          .catch(function (err) {
            console.log("erroeserves" + err);
          });
        res.redirect("admin.html");
      }
    }, 1000);
  }
);

app.get("/takequiz", (req, res) => {
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

app.post("/round1", (req, res) => {
  studentdetails.push(JSON.parse(JSON.stringify(req.body)));
});

app.get("/takeround2", (req, res) => {
  mongo_oper
    .getRound2Questions(connect.getConnection)
    .then(function (r) {
      console.log("resolved");
      res.json(r);
    })
    .catch(function (err) {
      console.log("erroeserves" + err);
      res.send(err);
    });
});
app.get("/takeround3", (req, res) => {
  mongo_oper
    .getRound3Questions(connect.getConnection)
    .then(function (r) {
      console.log("resolved");
      res.json(r);
    })
    .catch(function (err) {
      console.log("erroeserves" + err);
      res.send(err);
    });
});
app.post("/round2", (req, res) => {
  studentdetails.push(JSON.parse(JSON.stringify(req.body)));
  console.log(studentdetails);
});
app.post("/round3", (req, res) => {
  studentdetails.push(JSON.parse(JSON.stringify(req.body)));
  fs.createWriteStream()
});

app.get('/endtest',(req,res)=>{
  console.log(studentdetails[0]['pnumber']);
  var path ="./responses/"+studentdetails[0]['pnumber']+".txt";
  var file = fs.createWriteStream(path);
  file.on('error', function(err) { /* error handling */ });
studentdetails.forEach(function(v) { file.write((JSON.stringify(v))+ '\n'); });
file.end();
})
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server started"));
