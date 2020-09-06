var mongoose = require("mongoose");

var carSchema = new mongoose.Schema({
  chassis_number: Number,
  brand: String,
  modele: String,
  price: Number,
  transmission: String,
  consommation: Number,
  door: Number,
  fuel: String,
  power_ch: Number,
  seat: Number,
  color: String,
  status: String,
  photo: String,
  promo: Boolean,
});

module.exports = mongoose.model("Car", carSchema);
