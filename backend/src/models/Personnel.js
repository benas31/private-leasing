var mongoose = require("mongoose");

var personnelSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  phone: String,
  fk_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("Personnel", personnelSchema);
