const UserModel = require("../models/userinfomodels");

exports.addUser = (req, res) => {
    const { FIRST_NAME,LAST_NAME,ADDRESS,PIN_CODE,COUNTRY,DOB,EMAIL_ID,GENDER,PHONE_NUMBER,USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME } = req.body;
    
    //if (ITEM !== "ADD") {
        //return res.status(400).json({ message: "Invalid ITEM value. Expected 'ADD'." });
      //}

    if ( !FIRST_NAME || 
        !LAST_NAME || 
        !ADDRESS ||
        !PIN_CODE ||
        !COUNTRY ||
        !DOB || 
        !EMAIL_ID || 
        !GENDER || 
        !PHONE_NUMBER || 
        !USER_NAME || 
        !PASSWORD || 
        !SYSTEM_ROLE_SYS_ID ||
        !SYSTEM_ROLE_NAME) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    UserModel.findUserByEmail(EMAIL_ID, (err, existingUser) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
      }

      if (existingUser) {
          return res.status(409).json({ message: "Email ID already exists" });
      }
  
    UserModel.addUser(FIRST_NAME,LAST_NAME,ADDRESS,PIN_CODE,COUNTRY,DOB,EMAIL_ID,GENDER,PHONE_NUMBER,USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      res.status(200).json({
        status: "True",
        message: "User added successfully",
      });
    }
);
});
};