const connection = require("../Config/db");

const CategoryModel = {
  // Add city
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
};

module.exports = CategoryModel;
