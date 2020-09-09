var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  lastname: String,
  firstname: String,
  phone: String,
  role: String,
  // The select: false part will keep it from showing up when we retrieve the user object elsewhere in the code
  passwordReset: { type: String, select: false },
});

module.exports = mongoose.model("User", userSchema);
