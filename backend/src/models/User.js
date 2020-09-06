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

/* try {
  user = mongoose.model("user");
} catch (e) {
  user = mongoose.model("user", userSchema);
}

user.getClient = async () => {
  return await user.find({role});
}



module.exports = user; */
