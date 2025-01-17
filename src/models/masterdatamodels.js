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

};

module.exports = CategoryModel;
