var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/", function (req, res) {
  User.find((err, users) => {
    if (err) res.send(err);
    else res.json(users);
  });
});

router.get("/:id", function (req, res) {
  User.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
