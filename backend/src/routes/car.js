var express = require("express");
var router = express.Router();
var Car = require("../models/Car");

router.get("/", function (req, res) {
  Car.find({status: 0}, (err, cars) => {
    if (err) res.json({success: false, response: err});
    else res.json({success: true, response: cars});
  });
});

router.get("/:id", function (req, res) {
  Car.findById(req.params.id, (err, car) => {
    if (err) res.json({success: false, response: err});
    else res.json({success: true, response: car});
  });
});

module.exports = router;
