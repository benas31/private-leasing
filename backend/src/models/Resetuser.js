var mongoose = require("mongoose");

var contractSchema = new mongoose.Schema({
  time: Date,
  hash: String,
  fk_user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("Resetuser", contractSchema);
