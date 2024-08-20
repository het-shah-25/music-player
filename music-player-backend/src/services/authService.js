const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../helpers/jwtHelper");
const { sendEmail } = require("../utils/emailSender");
const jwt = require("jsonwebtoken");
// Helper function to generate OTP
function generateNumericOTP(length) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generate a random digit [0-9] and append to otp
  }
  return otp;
}

const signUp = async ({ fullName, mobile, email, password, referralCode }) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate OTP
  const otp = generateNumericOTP(6);
  const now = new Date();
  const otpExpires = new Date(now.getTime() + 10 * 60000); // OTP expires in 10 minutes

  // Creating a new user with OTP and verification fields
  user = new User({
    fullName,
    mobile,
    email,
    password: hashedPassword,
    referralCode,
    isVerified: false,
    otp,
    otpGeneratorTime: now,
    otpExpires,
  });

  // Send OTP via email
  const subject = "Your OTP for Account Verification";
  await sendEmail(email, subject, fullName, otp);
  await user.save();

  return {
    message:
      "Signup successful. Please verify your account with the OTP sent to your email.",
  };
};

const signIn = async ({ email, password }) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email");
  }
  if (!user.isVerified) {
    throw new Error("User account not verified. Please verify your account.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const payload = { user: { id: user.id } };
  const token = generateToken(payload);

  return token;
};

const validateOTP = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const now = new Date();
  if (user.otp !== otp || user.otpExpires < now) {
    throw new Error("Invalid or expired OTP");
  }
  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  return { message: "OTP verified and account is activated." };
};

const resendOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.isVerified) {
    return { message: "User is already verified. No need to resend OTP." };
  }
  const otp = generateNumericOTP(6);
  const now = new Date();
  const otpExpires = new Date(now.getTime() + 10 * 60000); // OTP expires in 10 minutes

  user.otp = otp;
  user.otpGeneratorTime = now;
  user.otpExpires = otpExpires;
  await user.save();

  const subject = "Your Resent OTP for Account Verification";
  await sendEmail(email, subject, user.fullName, otp);

  return { message: "OTP resent successfully." };
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};
const getUserInfoByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  signUp,
  signIn,
  validateOTP,
  resendOTP,
  getUserById,
  getUserInfoByToken,
};
