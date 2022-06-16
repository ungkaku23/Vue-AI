const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  access: {
    type: String,
    default: "user",
    enum: ["user", "owner", "admin"],
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    default: null 
  }
});

module.exports = mongoose.model("Membership", membershipSchema);
