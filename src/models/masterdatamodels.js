const connection = require("../Config/db");

const CategoryModel = {
  // Add category
  addCategory: (COURSE_CATEGORY_NAME,ISACTIVE, callback) => {
    const query = `INSERT INTO TBL_MST_COURSE_CATEGORY (COURSE_CATEGORY_NAME,ISACTIVE) VALUES (?,?)`;
    connection.query(query, [COURSE_CATEGORY_NAME,ISACTIVE], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  updateCategory: (COURSE_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID,ISACTIVE, callback) => {
    const query = `UPDATE TBL_MST_COURSE_CATEGORY
    SET COURSE_CATEGORY_NAME = ?, ISACTIVE = ?
    WHERE COURSE_CATEGORY_SYS_ID = ?`;
    connection.query(query, [COURSE_CATEGORY_NAME,ISACTIVE,COURSE_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  deleteCategory: (COURSE_CATEGORY_SYS_ID,ISACTIVE, callback) => {
    const query = `UPDATE TBL_MST_COURSE_CATEGORY
    SET  ISACTIVE = ?
    WHERE COURSE_CATEGORY_SYS_ID = ?`;
    connection.query(query, [ISACTIVE,COURSE_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  viewCategory: (ITEM, callback) => {
    if(ITEM=="VIEW_ALL" ){
        const query = `SELECT * FROM TBL_MST_COURSE_CATEGORY WHERE ISACTIVE = 1`;
        connection.query(query,  (err, results) => {
          if (err) {
            console.error("Error in addCity model:", err);
            return callback(err, null);
          }
          callback(null, results);
        });
    }
    
  },
  addSubCategory: (COURSE_SUB_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID,ISACTIVE, callback) => {
    
    const query = `INSERT INTO TBL_MST_COURSE_SUB_CATEGORY (COURSE_SUB_CATEGORY_NAME, COURSE_CATEGORY_SYS_ID,ISACTIVE) VALUES (?, ?, ?)`;
    connection.query(query, [COURSE_SUB_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID,ISACTIVE], (err, results) => {
      if (err) {
        
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  updateSubCategory: (COURSE_SUB_CATEGORY_NAME,COURSE_SUB_CATEGORY_SYS_ID,ISACTIVE, callback) => {
    const query = `UPDATE TBL_MST_COURSE_SUB_CATEGORY
    SET COURSE_SUB_CATEGORY_NAME = ?, ISACTIVE = ?
    WHERE COURSE_SUB_CATEGORY_SYS_ID = ?`;
    connection.query(query, [COURSE_SUB_CATEGORY_NAME,ISACTIVE,COURSE_SUB_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  deleteSubCategory: (COURSE_SUB_CATEGORY_SYS_ID,ISACTIVE, callback) => {
    const query = `UPDATE TBL_MST_COURSE_SUB_CATEGORY
    SET  ISACTIVE = ?
    WHERE COURSE_SUB_CATEGORY_SYS_ID = ?`;
    connection.query(query, [ISACTIVE,COURSE_SUB_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  viewSubCategory: (ITEM, COURSE_SUB_CATEGORY_SYS_ID,callback) => {
    if(ITEM=="VIEW_ALL" || COURSE_SUB_CATEGORY_SYS_ID !="" ){
        const query = `SELECT * FROM TBL_MST_COURSE_SUB_CATEGORY WHERE ISACTIVE = 1;`;
        connection.query(query, [COURSE_SUB_CATEGORY_SYS_ID], (err, results) => {
          if (err) {
            console.error("Error in addCity model:", err);
            return callback(err, null);
          }
          callback(null, results);
        });
    }
    
  },



///////system role code

  addSystemRole: (SYSTEM_ROLE_NAME,ISACTIVE, callback) => {
    const query = `INSERT INTO TBL_SYSTEM_ROLE (SYSTEM_ROLE_NAME,ISACTIVE) VALUES (?,?)`;
    connection.query(query, [SYSTEM_ROLE_NAME,ISACTIVE], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  updateSystemRole: (SYSTEM_ROLE_NAME,SYSTEM_ROLE_SYS_ID,ISACTIVE, callback) => {
    const query = `UPDATE TBL_SYSTEM_ROLE
    SET SYSTEM_ROLE_NAME = ?, ISACTIVE = ?
    WHERE SYSTEM_ROLE_SYS_ID = ?`;
    connection.query(query, [SYSTEM_ROLE_NAME,ISACTIVE,SYSTEM_ROLE_SYS_ID], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  deleteSystemrole: (SYSTEM_ROLE_SYS_ID,ISACTIVE, callback) => {
    const query = `UPDATE TBL_SYSTEM_ROLE
    SET  ISACTIVE = ?
    WHERE SYSTEM_ROLE_SYS_ID = ?`;
    connection.query(query, [ISACTIVE,SYSTEM_ROLE_SYS_ID], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  viewSystemRole: (ITEM, callback) => {
    if(ITEM=="VIEW_ALL" ){
        const query = `SELECT * FROM TBL_SYSTEM_ROLE WHERE ISACTIVE = 1 `;
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
