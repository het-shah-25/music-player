const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken } = require("../helpers/authMiddleware");
const {
  signupValidators,
  signinValidators,
} = require("../validators/authValidators");

const router = express.Router();

router.post("/signup", signupValidators, authController.signUp);
router.post("/signin", signinValidators, authController.signIn);
router.post("/validate-otp", authController.validateOTP);
router.post("/resend-otp", authController.resendOTP);
router.get("/me", authenticateToken, authController.getUserInfoByToken);
router.get("/:id", authenticateToken, authController.getUserById);

module.exports = router;
