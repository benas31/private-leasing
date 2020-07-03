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

router.post("/", function (req, res) {
  console.log("received: ", req.body);
  const contract = Contract.create(
    {
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      km_debut: req.body.km_debut,
      km_fin: req.body.km_fin,
      prix: req.body.prix,
      actif: req.body.actif,
      fk_car: req.body.fk_car,
      fk_client: req.body.fk_client,
      fk_personnel: req.body._fk_personnel,
    },
    (err, contract) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(contract).end();
      }
    }
  );
});

module.exports = router;
