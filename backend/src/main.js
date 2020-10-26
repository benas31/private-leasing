const express = require("express");
const helmet = require("helmet");
const app = express();
const http = require("http").createServer(app);
var mongoose = require("mongoose");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var car = require("./routes/car");
var user = require("./routes/user");
var resetuser = require("./routes/resetuser");
var contract = require("./routes/contract");
var User = require("./models/User");
var uristring = "mongodb://localhost/Leasing";
const bcrypt = require("bcrypt");
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const Multer = require('multer');

app.use(helmet());

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
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.set('view engine', 'pug');

app.use("/api/car", car);
app.use("/api/contract", contract);
app.use("/api/user", user);
app.use("/api/resetuser", resetuser);

app.post("/api/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then((data) => {
      bcrypt.compare(password, data.password, (err, result) => {
        if (result) {
          data = data.toObject();
          delete data.password;
          delete data.role;
          res.json({ success: true, response: data });
        }
        // password don't match
        else res.json({ success: false, response: 'Mot de passe incorrect' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, response: 'Something went wrong!' });
    });
});

app.post("/api/register", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const lastname = req.body.lastname;
  const role = req.body.role;
  const firstname = req.body.firstname;

  const userWithSameUsername = await User.findOne({ username });

  const userWithSameEmail = await User.findOne({ email });

  if (userWithSameUsername === null && userWithSameEmail === null) {
    bcrypt.hash(password, 10, (e, hash) => {
      User.create({ username, password: hash, email, role: role || "client", lastname, firstname, }, (err, user) => {
        if (err) {
          res.json({ success: false, response: err });
        } else {
          user = user.toObject();
          delete user.password;
          delete user.role;
          res.json({ success: true, response: user });
        }
      }
      );
    });
  } else if (userWithSameUsername) {
    res.json({ success: false, response: 'Username already exist!' });
  } else if (userWithSameEmail) {
    res.json({ success: false, response: 'Email already exist!' });
  }
});


const storage = new Storage();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const bucket = storage.bucket('tfeben');

app.post("/api/upload", multer.single('file'), (req, res) => {
  console.log('req.file', req.file);
  if (!req.file) return res.status(400).json({ success: false, response: 'No file uploaded.' });


  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    console.log(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);

});


http.listen(port, () => {
  console.log("listening on *:", port);
});
