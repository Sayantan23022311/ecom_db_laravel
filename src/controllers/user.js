const UserModel = require("../models/userinfomodels");

exports.addUser = (req, res) => {
  const {
    FIRST_NAME, LAST_NAME, ADDRESS, PIN_CODE, COUNTRY, DOB, EMAIL_ID, GENDER, PHONE_NUMBER, USER_NAME, PASSWORD, SYSTEM_ROLE_SYS_ID, SYSTEM_ROLE_NAME
  } = req.body;

  // Validate required fields
  if (
    !FIRST_NAME || !LAST_NAME  || !EMAIL_ID  || !PHONE_NUMBER || !USER_NAME || 
    !PASSWORD || !SYSTEM_ROLE_SYS_ID || !SYSTEM_ROLE_NAME
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate email
  UserModel.findUserByEmail(EMAIL_ID, (err, existingUser) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (existingUser) {
      return res.status(200).json({ message: "Email ID already exists" });
    }

    // Add user to TBL_USER_INFO
    UserModel.addUser(
      FIRST_NAME, LAST_NAME, ADDRESS, PIN_CODE, COUNTRY, DOB, EMAIL_ID, 
      GENDER, PHONE_NUMBER, USER_NAME, PASSWORD, SYSTEM_ROLE_SYS_ID, SYSTEM_ROLE_NAME,
      (err, results) => {
        if (err) {
          console.error("Error adding user to TBL_USER_INFO:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
    
        const USER_SYS_ID =results.insertId
        // Add user to TBL_AUTHENTICATION
        UserModel.addUserToAuthTable(
          USER_NAME, PASSWORD, SYSTEM_ROLE_SYS_ID, SYSTEM_ROLE_NAME,USER_SYS_ID,EMAIL_ID,
          (err, authResults) => {
            if (err) {
              console.error("Error adding user to TBL_AUTHENTICATION:", err);
              return res.status(500).json({ message: "Error creating authentication entry" });
            }

            // Success response
            res.status(200).json({
              status: "True",
              message: "User added successfully",
            });
          }
        );
      }
    );
  });
};
