const connection = require("../Config/db");

const CategoryModel = {
  // Add category
  addCategory: (CATEGORY, callback) => {
    const query = `INSERT INTO tbl_product_category (PRODUCT_CATEGORY) VALUES (?)`;
    connection.query(query, [CATEGORY], (err, results) => {
      if (err) {
        console.error("Error in addCity model:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  viewCategory: (ITEM, callback) => {
    if(ITEM=="VIEW_ALL" ){
        const query = `SELECT * FROM tbl_product_category`;
        connection.query(query,  (err, results) => {
          if (err) {
            console.error("Error in addCity model:", err);
            return callback(err, null);
          }
          callback(null, results);
        });
    }
    
  },
  addSubCategory: (PRODUCT_SUB_CATEGORY,PRODUCT_CATEGORY_SYS_ID, callback) => {
    
    const query = `INSERT INTO tbl_product_subcategory (PRODUCT_SUB_CATEGORY, PRODUCT_CATEGORY_SYS_ID) VALUES (?, ?)`;
    connection.query(query, [PRODUCT_SUB_CATEGORY,PRODUCT_CATEGORY_SYS_ID], (err, results) => {
      if (err) {
        
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  viewSubCategory: (ITEM, PRODUCT_CATEGORY_SYS_ID,callback) => {
    if(ITEM=="VIEW_ALL" || PRODUCT_CATEGORY_SYS_ID !="" ){
        const query = `SELECT * FROM tbl_product_subcategory WHERE PRODUCT_CATEGORY_SYS_ID = ?;`;
        connection.query(query, [PRODUCT_CATEGORY_SYS_ID], (err, results) => {
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
