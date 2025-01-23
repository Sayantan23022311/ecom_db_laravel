const userModel = require("../models/usermodels");
const jwt = require("jsonwebtoken");
exports.login = (req, res) => {
  const SECRET_KEY = "56b8251c7e2a44f4b72f4e9d32f2c7da53747d9f86a76f4d7f7cb65379a5c819"; 
    
  const { USER_NAME, PASSWORD } = req.body;

  if (!USER_NAME || !PASSWORD) {
    return res
      .status(400)
      .json({ message: "Username or password missing for login" });
  }

  userModel.findUserByCredentials(USER_NAME, PASSWORD, (error, results) => {
    console.log(results,"results");
    
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(200)
        .json({ message: "Invalid username or password" });
    }
   
    const user = results[0];
    const token = jwt.sign(
      { id: user.USER_ID, username: user.USER_NAME }, // Payload
      SECRET_KEY, // Secret key
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({ message: "Login successful",token, user });
  });
};
