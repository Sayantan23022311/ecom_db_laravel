const connection = require("../Config/db");

const UserModel = {
  // findUserByEmail method
  findUserByEmail: (EMAIL_ID, callback) => {
    const sql = "SELECT * FROM TBL_USER_INFO WHERE EMAIL_ID = ?";
    connection.query(sql, [EMAIL_ID], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results.length > 0 ? results[0] : null); // Return user if found
    });
},
  // Add user
  addUser: (FIRST_NAME,LAST_NAME,ADDRESS,PIN_CODE,COUNTRY,DOB,EMAIL_ID,GENDER,PHONE_NUMBER,USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME, callback) => {
    const query = `INSERT INTO TBL_USER_INFO (FIRST_NAME,LAST_NAME,ADDRESS,PIN_CODE,COUNTRY,DOB,EMAIL_ID,GENDER,PHONE_NUMBER,USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    connection.query(query, [FIRST_NAME,LAST_NAME,ADDRESS,PIN_CODE,COUNTRY,DOB,EMAIL_ID,GENDER,PHONE_NUMBER,USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  addUserToAuthTable: (USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME,USER_SYS_ID,EMAIL_ID, callback) => {
    const query = `INSERT INTO TBL_AUTHENTICATION (USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME,USER_SYS_ID,USER_EMAIL) VALUES (?,?,?,?,?,?)`;
    connection.query(query, [USER_NAME,PASSWORD,SYSTEM_ROLE_SYS_ID,SYSTEM_ROLE_NAME,USER_SYS_ID,EMAIL_ID], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  viewUser: (ITEM, callback) => {
    if(ITEM=="VIEW_ALL" ){
        const query = `SELECT * FROM TBL_USER_INFO`;
        connection.query(query,  (err, results) => {
          if (err) {
            console.error("Error in addCity model:", err);
            return callback(err, null);
          }
          callback(null, results);
        });
    }
    
  },

};



module.exports = UserModel;