const connection = require("../Config/db");

const UserModel = {
  // findUserByEmail method
  findCourseName: (COURSE_NAME, callback) => {
    const sql = "SELECT * FROM TBL_COURSE_DETAILES WHERE COURSE_NAME = ?";
    connection.query(sql, [COURSE_NAME], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results.length > 0 ? results[0] : null); // Return user if found
    });
},
  // Add course
  addCourse: ( COURSE_CATEGORY_SYS_ID, COURSE_SUB_CATEGORY_SYS_ID, COURSE_NAME, COURSE_TYPE, COURSE_IMAGE, IS_PLAYLIST, COURSE_DESCRIPTION, COURSE_STATUS, COURSE_PRICE, callback) => {
    const query = `INSERT INTO TBL_COURSE_DETAILES ( COURSE_CATEGORY_SYS_ID, COURSE_SUB_CATEGORY_SYS_ID, COURSE_NAME, COURSE_TYPE, COURSE_IMAGE, IS_PLAYLIST, COURSE_DESCRIPTION, COURSE_STATUS, COURSE_PRICE) VALUES (?,?,?,?,?,?,?,?,?)`;
    connection.query(query, [ COURSE_CATEGORY_SYS_ID, COURSE_SUB_CATEGORY_SYS_ID, COURSE_NAME, COURSE_TYPE, COURSE_IMAGE, IS_PLAYLIST, COURSE_DESCRIPTION, COURSE_STATUS, COURSE_PRICE], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
 

};

module.exports = UserModel;