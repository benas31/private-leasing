const express = require("express");
const app = express();
const http = require("http").createServer(app);
var mongoose = require("mongoose"); // The reason for this demo.
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cars = require("./routes/cars");

var uristring = "mongodb://localhost/Leasing";

var port = 5000;

mongoose
  .connect(uristring, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Db connected"))
  .catch(() => {
    console.log("Error with the connection to the db");
  });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
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

app.use("/api/car", cars);

http.listen(port, () => {
  console.log("listening on *:", port);
});
