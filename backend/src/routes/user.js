var express = require("express");
var router = express.Router();
var User = require("../models/User");
const bcrypt = require("bcrypt");

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

router.post("/changePassword/:id", function (req, res) {
  const _id = req.params.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  User.findOne({ _id })
    .then((data) => {
      bcrypt.compare(oldPassword, data.password, (err, result) => {
        if (result) {
          bcrypt.hash(newPassword, 10, (e, hash) => {
            User.updateOne( { _id }, { password: hash }, (err, user) => {
              if (err) {
                res.json({success: false, response: err});
              } else {
                res.json({success: true, response: 'Mot de passe modifié'});
              }
            });
          });
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

module.exports = router;
