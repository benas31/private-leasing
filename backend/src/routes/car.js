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

router.post("/add", function (req, res) {
  console.log("received: ", req.body);
  Car.create(
    {
      chassis_number: req.body.chassis_number,
      brand: req.body.brand,
      modele: req.body.modele,
      price: req.body.price,
      transmission: req.body.transmission,
      consommation: req.body.consommation,
      door: req.body.door,
      fuel: req.body.fuel,
      power_ch: req.body.power_ch,
      seat: req.body.seat,
      color: req.body.color,
      status: req.body.status,
      promo: req.body.promo,
      status: 0,
      photo: req.body.photo,
    },
    (err, car) => {
      if (err) {
        res.json({success: false, response: err});
      } else {
        res.json({success: true, response: car});
      }
    }
  );
});

module.exports = router;
