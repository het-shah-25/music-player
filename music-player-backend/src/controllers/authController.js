const { validationResult } = require("express-validator");
const authService = require("../services/authService");
const { getUserById } = require("../services/authService");
exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, errors: errors.array() });
  }
  try {
    const token = await authService.signUp(req.body);
    res.status(201).json({ status: 201, token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, errors: errors.array() });
  }

  try {
    const token = await authService.signIn(req.body);
    res.status(200).json({ status: 200, token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.validateOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.validateOTP(email, otp);
    res.status(200).json({ status: 200, message: result.message });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.resendOTP(email);
    res.status(200).json({ status: 200, message: result.message });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.getUserInfoByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming 'Bearer <token>'
    const user = await authService.getUserInfoByToken(token);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
