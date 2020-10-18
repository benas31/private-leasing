var express = require("express");
var router = express.Router();
var Contract = require("../models/Contract");
var User = require("../models/User");
var Car = require("../models/Car");

router.get("/", function (req, res) {
  Contract.find((err, contracts) => {
    if (err) res.send(err);
    else res.json(contracts);
  });
});

router.get("/deleteById/:id", function (req, res) {
  Contract.deleteOne({ _id: req.params.id }, (err, contract) => {
    if (err) res.json({ success: false, response: err });
    else res.json({ success: true, response: contract });
  });
});

router.get("/fetchDemands/", function (req, res) {
  Contract.find({ actif: 0 }, (err, contracts) => {
    if (err) res.json({ success: false, response: err });
    else res.json({ success: true, response: contracts });
  });
});

router.post("/updateById/:id", function (req, res) {
  console.log('recieved:', req.body);
  const _id = req.body.contract._id;
  const idCar = req.body.carId;
  Car.updateOne({ _id: idCar }, { status: 1 }, (err, car) => {
    if (err) {
      res.json({ success: false, response: err });
    }
  });

  Contract.updateOne({ _id }, {
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    km_debut: req.body.km_debut,
    km_fin: req.body.km_fin,
    km_year: req.body.km_year,
    prix: req.body.prix,
    actif: req.body.actif,
    fk_personnel: req.body.fk_personnel,
  }, (err, contract) => {
    if (err) {
      console.log('err', err);
      res.json({ success: false, response: err });
    } else {
      res.json({ success: true, response: 'Contract Updated' });
    }
  });
});

router.get("/getByUserId/:id", function (req, res) {
  const userId = req.params.id;
  User.findById(userId, (err, data) => {
    if (data) {
      const userRole = data.role;
      if (userRole === "admin" || userRole === "personnel" || userRole === "vendeur") {
        Contract.find({ fk_personnel: userId }, (err, contracts) => {
          if (err) res.json({ success: false, response: err });
          else res.json({ success: true, response: contracts });
        });
      } else {
        Contract.find({ fk_client: userId }, (err, contracts) => {
          if (err) res.json({ success: false, response: err });
          else res.json({ success: true, response: contracts });
        });
      }
    } else {
      console.log(data);
      res.json({ success: false, response: "id not found" });
    }
  });
});

router.get("/:id", function (req, res) {
  Contract.findById(req.params.id, (err, data) => {
    res.send(data);
  });
});

router.post("/", function (req, res) {
  const carId = req.body.fk_car;
  const user = req.body.user;
  const status = user.role === 'vendeur' ? 1 : 0;
  Car.updateOne({ _id: carId }, { status }, (err, user) => {
    if (err) {
      res.json({ success: false, response: err });
    } else {
      Contract.create(
        {
          date_start: req.body.date_start,
          date_end: req.body.date_end,
          km_debut: req.body.km_debut,
          km_fin: req.body.km_fin,
          km_year: req.body.km_year,
          prix: req.body.prix,
          actif: req.body.actif,
          fk_car: req.body.fk_car,
          fk_client: req.body.fk_client,
          fk_personnel: req.body.fk_personnel,
        },
        (err, contract) => {
          if (err) {
            res.json({ success: false, response: err });
          } else {
            res.json({ success: true, response: contract });
          }
        }
      );
    }
  });

});

module.exports = router;
