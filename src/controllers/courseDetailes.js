const UserModel = require("../models/Coursemodels");

exports.addCourse = (req, res) => {
  const {
    COURSE_CATEGORY_SYS_ID, COURSE_SUB_CATEGORY_SYS_ID, COURSE_NAME, COURSE_TYPE, IS_PLAYLIST, COURSE_DESCRIPTION, COURSE_STATUS, COURSE_PRICE
  } = req.body;

  // Validate required fields
  if (
    !COURSE_CATEGORY_SYS_ID || !COURSE_SUB_CATEGORY_SYS_ID  || !COURSE_NAME  || !IS_PLAYLIST || !COURSE_STATUS 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const COURSE_IMAGE = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

  // Check for duplicate email
  UserModel.findCourseName(COURSE_NAME, (err, existingUser) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (existingUser) {
      return res.status(200).json({ message: "Course Name already exists" });
    }

    // Add user to TBL_USER_INFO
    UserModel.addCourse(
        COURSE_CATEGORY_SYS_ID, COURSE_SUB_CATEGORY_SYS_ID, COURSE_NAME, COURSE_TYPE, COURSE_IMAGE, IS_PLAYLIST, COURSE_DESCRIPTION, COURSE_STATUS, COURSE_PRICE,
      (err, results) => {
        if (err) {
          console.error("Error adding", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({
            status: "True",
            message: "Course added successfully",
          });
        // const USER_SYS_ID =results.insertId
        // Add user to TBL_AUTHENTICATION
       
      }
    );
  });
};
