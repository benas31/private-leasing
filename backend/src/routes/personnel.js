var express = require("express");
var router = express.Router();
var Personnel = require("../models/Personnel");

router.get("/", function (req, res) {
  Personnel.find((err, personnels) => {
    if (err) res.send(err);
    else res.json(personnels);
  });
});

router.get("/:id", function (req, res) {
  Personnel.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
