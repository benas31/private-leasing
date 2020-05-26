var express = require("express");
var router = express.Router();
var Contract = require("../models/Contract");

router.get("/", function (req, res) {
  Contract.find((err, contracts) => {
    if (err) res.send(err);
    else res.json(contracts);
  });
});

router.get("/:id", function (req, res) {
  Contract.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
