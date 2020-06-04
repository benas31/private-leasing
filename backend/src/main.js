const express = require("express");
const app = express();
const http = require("http").createServer(app);
var mongoose = require("mongoose");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var car = require("./routes/car");
var user = require("./routes/user");
var client = require("./routes/client");
var contract = require("./routes/contract");
var personnel = require("./routes/personnel");
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
app.use("/api/client", client);
app.use("/api/contract", contract);
app.use("/api/personnel", personnel);
app.use("/api/user", user);

app.post("/api/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then((data) => {
      bcrypt.compare(password, data.password, (err, result) => {
        if (result) res.status(200).send(data).end();
        //password don't match
        else res.status(200).end();
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).end();
    });
});

app.post("/api/register", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;

  bcrypt.hash(password, 10, (err, hash) => {
    User.create(
      {
        username,
        password: hash,
        email,
        role: "client",
        verified: 1,
        token: null,
      },
      (err, user) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(user).end();
        }
      }
    );
  });
});

http.listen(port, () => {
  console.log("listening on *:", port);
});
