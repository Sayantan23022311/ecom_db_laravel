const connection = require("../Config/db");
const bcrypt = require('bcryptjs');

// Function to find a user by username and password
exports.findUserByCredentials = (USER_NAME, callback) => {
  const query =
    "SELECT * FROM TBL_AUTHENTICATION WHERE USER_EMAIL = ?";
  connection.query(query, [USER_NAME], callback);
 
};



