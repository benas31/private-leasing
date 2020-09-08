var express = require("express");
var router = express.Router();
var Car = require("../models/Car");

router.get("/", function (req, res) {
  Car.find((err, cars) => {
    if (err) res.json({success: false, response: err});
    else res.json({success: true, response: cars});
  });
});

router.get("/:id", function (req, res) {
  Car.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
