var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  lastname: String,
  firstname: String,
  address: String,
  phone: String,
  role: String,
  verified: Number,
  token: String,
});

module.exports = mongoose.model("User", userSchema);
