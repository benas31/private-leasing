var express = require("express");
var router = express.Router();
var Car = require("../models/Car");

router.get("/", function (req, res) {
  Car.find((err, cars) => {
    if (err) res.send(err);
    else res.json(cars);
  });
});

module.exports = router;
