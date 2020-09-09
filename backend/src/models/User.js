var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  lastname: String,
  firstname: String,
  phone: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
