const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserSchema = new mongoose.model("userdetails", User);

module.exports = UserSchema;