const connection = require("../Config/db");

const CategoryModel = {
  // Add category
  addCategory: (COURSE_CATEGORY_NAME, callback) => {
    const query = `INSERT INTO TBL_MST_COURSE_CATEGORY (COURSE_CATEGORY_NAME) VALUES (?)`;
    connection.query(query, [COURSE_CATEGORY_NAME], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  viewCategory: (ITEM, callback) => {
    if(ITEM=="VIEW_ALL" ){
        const query = `SELECT * FROM TBL_MST_COURSE_CATEGORY`;
        connection.query(query,  (err, results) => {
          if (err) {
            console.error("Error in addCity model:", err);
            return callback(err, null);
          }
          callback(null, results);
        });
    }
    
  },
  addSubCategory: (COURSE_SUB_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID, callback) => {
    
    const query = `INSERT INTO TBL_MST_COURSE_SUB_CATEGORY (COURSE_SUB_CATEGORY_NAME, COURSE_CATEGORY_SYS_ID) VALUES (?, ?)`;
    connection.query(query, [COURSE_SUB_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  viewSubCategory: (ITEM, COURSE_CATEGORY_SYS_ID,callback) => {
    if(ITEM=="VIEW_ALL" || COURSE_CATEGORY_SYS_ID !="" ){
        const query = `SELECT * FROM TBL_MST_COURSE_SUB_CATEGORY WHERE COURSE_CATEGORY_SYS_ID = ?;`;
        connection.query(query, [COURSE_CATEGORY_SYS_ID], (err, results) => {
          if (err) {
            console.error("Error in addCity model:", err);
            return callback(err, null);
          }
          callback(null, results);
        });
    }
    
  },
  addSystemRole: (SYSTEM_ROLE_NAME, CREATED_BY, CREATED_DATE, ISACTIVE, callback) => {
    const query = `INSERT INTO TBL_SYSTEM_ROLE (SYSTEM_ROLE_NAME, CREATED_BY, CREATED_DATE, ISACTIVE) VALUES (?,?,?,?)`;
    connection.query(query, [SYSTEM_ROLE_NAME, CREATED_BY, CREATED_DATE, ISACTIVE], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  updateSystemRole: (SYSTEM_ROLE_SYS_ID, SYSTEM_ROLE_NAME, MODIFIED_BY, MODIFIED_DATE, ISACTIVE, callback) => {
    const { SYSTEM_ROLE_SYS_ID, SYSTEM_ROLE_NAME, MODIFIED_BY, MODIFIED_DATE, ISACTIVE } = data;

    // SQL query to update the system role in the database
    const query = `
      UPDATE TBL_SYSTEM_ROLE
      SET SYSTEM_ROLE_NAME = ?, MODIFIED_BY = ?, MODIFIED_DATE = ?, ISACTIVE = ?
      WHERE SYSTEM_ROLE_SYS_ID = ?
    `;

    // Execute the query
    db.query(
      query,
      [SYSTEM_ROLE_NAME, MODIFIED_BY, MODIFIED_DATE, ISACTIVE, SYSTEM_ROLE_SYS_ID],
      (err, results) => {
        if (err) {
          console.error("Error updating system role:", err);
          return callback(err, null);
        }
        callback(null, results);
      });
  },
  viewSystemRole: (ITEM, callback) => {
    if(ITEM=="VIEW_ALL" ){
        const query = `SELECT * FROM TBL_SYSTEM_ROLE`;
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

module.exports = CategoryModel;
