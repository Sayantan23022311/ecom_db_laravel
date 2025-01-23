const jwt = require("jsonwebtoken");

const SECRET_KEY = "56b8251c7e2a44f4b72f4e9d32f2c7da53747d9f86a76f4d7f7cb65379a5c819";

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token is required" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach the decoded token data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = verifyToken;
