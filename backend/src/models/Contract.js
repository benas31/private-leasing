var mongoose = require("mongoose");

var contractSchema = new mongoose.Schema({
  date_start: Date,
  date_end: Date,
  km_debut: Number,
  km_fin: Number,
  prix: Number,
  actif: Number,
  fk_car: { type: mongoose.Schema.Types.ObjectId, ref: "car" },
  fk_client: { type: mongoose.Schema.Types.ObjectId, ref: "client" },
  fk_personnel: { type: mongoose.Schema.Types.ObjectId, ref: "personnel" },
});

module.exports = mongoose.model("Contract", contractSchema);
