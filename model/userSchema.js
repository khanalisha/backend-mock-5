const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  Avatar: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("blogUser", userSchema);

module.exports = {
  userModel,
};
