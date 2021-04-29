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
var request = require("request");
const app = express();
var loggedin = "false";
//var studentdetails = {};
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
    req.body.username == process.env.USER_NAME &&
    req.body.password == process.env.PASSWORD
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



app.post(
  "/admins/onupload",
  isLoggedIn,
  upload.single("quizques"),
  (req, res) => {
    var r1 = 0,
      r2 = 0,
      r3 = 0;
    converted_data1 = Round1conversion(req.file.filename);
    converted_data2 = Round2conversion(req.file.filename);
    converted_data3 = Round3conversion(req.file.filename);
    Round1.create(converted_data1).then(function () {
      mongo_oper
        .first(connect.getConnection, converted_data1)
        .then(function () {
          r1 = 1;
        });
    });
    Round2.create(converted_data2).then(function (round2) {
      mongo_oper
        .Round2insert(connect.getConnection, converted_data2)
        .then(function () {
          r2 = 1;
        });
    });
    Round3.create(converted_data2).then(function (round3) {
      mongo_oper
        .Round3insert(connect.getConnection, converted_data3)
        .then(function () {
          r3 = 1;
        });
    });

    var stop = setInterval(() => {
      if (r1 == 1 && r2 == 1 && r3 == 1) {
        clearInterval(stop);
        mongo_oper
          .getRound3Questions(connect.getConnection)
          .then(function (r) {
            var arr = r;
            arr.sort((a,b)=>{
              if(a.QNO<b.QNO){
                return -1;
              }
              else{
                return 1;
              }
            });
            for (var i = 0; i < arr.length; i++) {
              saveImageToDisk(
                arr[i].Images,
                "./public/round3images/" + i + ".jpg",
                i
              );
            }
            function saveImageToDisk(url, path, i) {
              var fullUrl = url;
              var localPath = fs.createWriteStream(path);
               https.get(fullUrl, function (response) {
                response.pipe(localPath);
              });
            }
          })
          .catch(function (err) {
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
      res.json(r);
    })
    .catch(function (err) {
      res.send(err);
    });
});


app.get("/takeround2", (req, res) => {
  mongo_oper
    .getRound2Questions(connect.getConnection)
    .then(function (r) {
      res.json(r);
    })
    .catch(function (err) {
      res.send(err);
    });
});
app.get("/takeround3", (req, res) => {
  mongo_oper
    .getRound3Questions(connect.getConnection)
    .then(function (r) {
     
      res.json(r);
    })
    .catch(function (err) {
      res.send(err);
    });
});

app.post("/round3", (req, res) => {
 
  studentdetails=JSON.parse(JSON.stringify(req.body));
  const folderName = './responses'

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}
  var path = "./responses/" + studentdetails["phonenumber"]+ Date.now() + ".txt";
  var file = fs.createWriteStream(path);
  file.write(JSON.stringify(studentdetails) + "\n");
  file.end();
  res.sendStatus(req.body);

});
app.get('/registrationdone',(req, res)=>{
  res.redirect("instructions.html");
})

// app.get("/endtest", (req, res) => {
  
// const folderName = './responses'

// try {
//   if (!fs.existsSync(folderName)) {
//     fs.mkdirSync(folderName)
//   }
// } catch (err) {
//   console.error(err)
// }
//   var path = "./responses/" + studentdetails["pnumber"]+ Date.now() + ".txt";
//   var file = fs.createWriteStream(path);
//   file.write(JSON.stringify(studentdetails) + "\n");
//   file.end();
//   res.sendStatus(200);

// });

app.get("/admins/mailresponse", (req, res) => {
  let directory_name = "./responses";
 
  let openedDir = fs.opendirSync(directory_name);
  let filesLeft = true;
  fs.open('finalresponse.txt', 'w', function (err, file) {
    if (err) throw err;
  
  });
  while (filesLeft) {
    let fileDirent = openedDir.readSync();
    if (fileDirent != null) {
    var data= fs.readFileSync("./responses/"+fileDirent.name, "utf8");
    fs.appendFileSync('finalresponse.txt',data+"\n");
    }
    
    else filesLeft = false;
  }
 
 res.download("finalresponse.txt")
});
app.get('/admins/del',()=>{
  const fs = require('fs').promises;

const directory = './responses';

fs.rmdir(directory, { recursive: true });
res.sendStatus(200);


});  
app.get('/logout',(req,res)=>{
  res.clearCookie("name");
  loggedin="false";
  res.redirect('/');
})
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Server started"));
