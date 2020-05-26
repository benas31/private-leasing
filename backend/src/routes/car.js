var express = require("express");
var router = express.Router();
var Car = require("../models/Car");

router.get("/", function (req, res) {
  Car.find((err, cars) => {
    if (err) res.send(err);
    else res.json(cars);
  });
});

router.get("/:id", function (req, res) {
  Car.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
