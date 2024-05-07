const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Angel Priya",
  },

  regId: {
    type: String,
    required: true,
    unique: true,
  },
  mob: {
    type: Number,
    default: 9234119087,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
