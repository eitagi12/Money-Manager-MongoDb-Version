var mongoose = require("mongoose");

var activitySchema = mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  remarks: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

var activity = mongoose.model("activity", activitySchema);
module.exports = activity;
