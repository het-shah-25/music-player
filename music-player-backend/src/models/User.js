const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpGeneratorTime: Date,
  otpExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
