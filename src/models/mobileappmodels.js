const connection = require("../Config/db");

// Function to find a user by username and password
exports.findUserByCredentials = (USER_NAME, PASSWORD, callback) => {
  const query =
    "SELECT * FROM tbl_user_authenticate WHERE USER_NAME = ? AND PASSWORD = ?";
  connection.query(query, [USER_NAME, PASSWORD], callback);
};
