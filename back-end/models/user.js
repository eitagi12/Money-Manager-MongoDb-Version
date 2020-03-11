var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone_number: { type: Number },
  role: { type: String, ENUM: ["user", "admin"] },
  createdAt: { type: Date, default: Date.now }
});

var user = mongoose.model("user", userSchema);
module.exports = user;
