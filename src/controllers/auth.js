const userModel = require("../models/usermodels");

exports.login = (req, res) => {
  const { USER_NAME, PASSWORD } = req.body;

  if (!USER_NAME || !PASSWORD) {
    return res
      .status(400)
      .json({ message: "Username or password missing for login" });
  }

  userModel.findUserByCredentials(USER_NAME, PASSWORD, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    const user = results[0];
    res.json({ message: "Login successful", user });
  });
};
