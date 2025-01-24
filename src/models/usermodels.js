const connection = require("../Config/db");

// Function to find a user by username and password
exports.findUserByCredentials = (USER_NAME, PASSWORD, callback) => {
  const query =
    "SELECT * FROM TBL_AUTHENTICATION WHERE USER_EMAIL = ? AND PASSWORD = ?";
  connection.query(query, [USER_NAME, PASSWORD], callback);
};



