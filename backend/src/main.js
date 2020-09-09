const express = require("express");
const app = express();
const http = require("http").createServer(app);
var mongoose = require("mongoose");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var car = require("./routes/car");
var user = require("./routes/user");
var contract = require("./routes/contract");
var User = require("./models/User");
var uristring = "mongodb://localhost/Leasing";
const bcrypt = require("bcrypt");

var port = 5000;

mongoose
  .connect(uristring, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Db connected"))
  .catch(() => {
    console.log("Error with the connection to the db");
  });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/car", car);
app.use("/api/contract", contract);
app.use("/api/user", user);

app.post("/api/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then((data) => {
      bcrypt.compare(password, data.password, (err, result) => {
      if (result) {
        data = data.toObject();
        delete data.password;
        res.json({success: true, response: data});
      }
        // password don't match
        else res.json({success: false, response: 'Mot de passe incorrect'});
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({success: false, response: 'Something went wrong!'});
    });
});

app.post("/api/register", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const lastname = req.body.lastname;
  const role = req.body.role;
  const firstname = req.body.firstname;
  
  User.findOne({ username })
    .then((data) => {
      if (data) res.json({success: false, response: 'Username already exist!'});
    })

  bcrypt.hash(password, 10, (e, hash) => {
    User.create({ username, password: hash, email, role: role || "client", lastname, firstname, }, (err, user) => {
        if (err) {
          res.json({success: false, response: err});
        } else {
          user = user.toObject();
          delete user.password;
          res.json({success: true, response: user});
        }
      }
    );
  });
});

http.listen(port, () => {
  console.log("listening on *:", port);
});
