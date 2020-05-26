var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  address: String,
  phone: String,
  fk_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("Client", clientSchema);
