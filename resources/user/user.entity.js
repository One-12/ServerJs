var mongoose = require("mongoose");

var userSchema = {
  uid: { type: String, required: true },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
  email: { type: String },
};

module.exports = mongoose.model("users", userSchema);
