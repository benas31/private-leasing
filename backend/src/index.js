const express = require("express");
const app = express();
const http = require("http").createServer(app);
const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://postgres:bruxelle@localhost:5432/project");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/api/car", function (req, res) {
  db.any("SELECT * from car")
    .then(function (data) {
      console.log(data);
      res.send(data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
});

app.get("/api/account", function (req, res) {
  db.any("SELECT * from account")
    .then(function (data) {
      res.send(data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
});

app.get("/api/contract", function (req, res) {
  db.any("SELECT * from contrat")
    .then(function (data) {
      res.send(data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
});

app.get("/api/user/:id", function (req, res) {
  db.one("SELECT * FROM users WHERE id=$1", req.params.id).then(function (
    data
  ) {
    res.send(data);
  });
});

app.get("/api/client/:id", function (req, res) {
  db.one("SELECT * FROM client WHERE id=$1", req.params.id).then(function (
    data
  ) {
    res.send(data);
  });
});

app.get("/api/personnel/:id", function (req, res) {
  db.one("SELECT * FROM personnel WHERE id=$1", req.params.id).then(function (
    data
  ) {
    res.send(data);
  });
});

app.get("/api/car/:id", function (req, res) {
  db.one("SELECT * FROM car WHERE id=$1", req.params.id).then(function (data) {
    res.send(data);
  });
});

app.post("/api/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log("received: ", username, password);

  db.one("SELECT * FROM users WHERE username= $1 AND password = $2", [
    username,
    password,
  ])
    .then((data) => {
      console.log("Login successful");
      res.status(200).send(data).end();
    })
    .catch((err) => {
      console.log("Login failed");
      res.status(200).end();
    });
});

app.post("/api/register", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
