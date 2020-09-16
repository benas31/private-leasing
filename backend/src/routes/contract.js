var express = require("express");
var router = express.Router();
var Contract = require("../models/Contract");
var User = require("../models/User");

router.get("/", function (req, res) {
  Contract.find((err, contracts) => {
    if (err) res.send(err);
    else res.json(contracts);
  });
});

router.get("/deleteById/:id", function (req, res) {
  Contract.deleteOne({_id: req.params.id}, (err, contract) => {
    if (err) res.json({success: false, response: err});
    else  res.json({success: true, response: contract});
  });
});

router.get("/getByUserId/:id", function (req, res) {
  const userId = req.params.id;
  User.findById(userId, (err, data) => {
    if (data) {
      const userRole = data.role;
      if (userRole === "admin" || userRole === "personnel" || userRole === "vendeur") {
        Contract.find({ fk_personnel: userId }, (err, contracts) => {
          if (err) res.json({success: false, response: err});
          else  res.json({success: true, response: contracts});
        });
      } else {
        Contract.find({ fk_client: userId }, (err, contracts) => {
          if (err) res.json({success: false, response: err});
          else res.json({success: true, response: contracts});
        });
      }
    } else {
      console.log(data);
      res.json({success: false, response: "id not found"});
    }
  });
});

router.get("/:id", function (req, res) {
  Contract.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

router.post("/", function (req, res) {
  console.log("received: ", req.body);
  Contract.create(
    {
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      km_debut: req.body.km_debut,
      km_fin: req.body.km_fin,
      km_year: req.body.km,
      prix: req.body.prix,
      actif: req.body.actif,
      fk_car: req.body.fk_car,
      fk_client: req.body.fk_client,
      fk_personnel: req.body.fk_personnel,
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
