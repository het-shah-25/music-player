const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Split "Bearer token" from Authorization header
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token is expired", expiredAt: err.expiredAt });
      }
      return res.status(403).json({ message: "Token is invalid" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
