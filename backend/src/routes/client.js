var express = require("express");
var router = express.Router();
var Client = require("../models/Client");

router.get("/", function (req, res) {
  Client.find((err, clients) => {
    if (err) res.send(err);
    else res.json(clients);
  });
});

router.get("/:id", function (req, res) {
  Client.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
