const userModel = require("../models/usermodels");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
exports.login = (req, res) => {
  const SECRET_KEY = "56b8251c7e2a44f4b72f4e9d32f2c7da53747d9f86a76f4d7f7cb65379a5c819"; 
    
  const { USER_NAME, PASSWORD } = req.body;

  if (!USER_NAME || !PASSWORD) {
    return res
      .status(400)
      .json({ message: "Username or password missing for login" });
  }

  userModel.findUserByCredentials(USER_NAME, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  
    if (!results || results.length === 0) {
      return res.status(200).json({ status:"false",  message: "User account not avalable in this system" });
    }
  
    const user = results[0];

  
    // Compare password securely using bcrypt
    bcrypt.compare(PASSWORD, user.PASSWORD, (err) => {
      console.log(PASSWORD, user.PASSWORD,"compare");
      
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      if (PASSWORD != user.PASSWORD) {
        return res.status(200).json({status:"false",  message: "Wrong Passsword plz check it" });
      }
  
      // Password is correct, generate token
      const token = jwt.sign(
        { id: user.USER_ID, username: user.USER_NAME },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      res.json({ message: "Login successful", token, user });
    });
  });
};
