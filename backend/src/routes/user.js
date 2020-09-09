var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/", function (req, res) {
  User.find((err, users) => {
    if (err) res.json({success: false, response: err});
    else res.json({success: true, response: users});
  });
});

router.get("/getById/:id", function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) res.json({success: false, response: err});
    else res.json({success: true, response: user});
  });
});

router.get("/getClients", function (req, res) {
  User.find({role: "client"}, {_id: 1, lastname: 1, firstname: 1}, (err, clients) => {
    if (err) res.json({success: false, response: err});
    else res.json({success: true, response: clients});
  });
});

module.exports = router;
