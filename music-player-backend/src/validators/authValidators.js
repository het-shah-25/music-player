const { check } = require("express-validator");

exports.signupValidators = [
  check("fullName", "Full Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("mobile", "Mobile number is required and must be valid")
    .not()
    .isEmpty()
    .matches(/\+?[1-9]\d{1,10}$/)
    .isLength({ min: 8, max: 10 }),
  check(
    "password",
    "Please enter a password with 8 or more characters"
  ).isLength({ min: 8 }),
];

exports.signinValidators = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];
