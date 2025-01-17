const CategoryModel = require("../models/masterdatamodels");

exports.addCategory = (req, res) => {
  const { CATEGORY } = req.body;

  if (!CATEGORY) {
    return res.status(400).json({ message: "Category name is required" });
  }

  CategoryModel.addCategory(CATEGORY, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({
      status: "True",
      message: "Category added successfully",
    });
  });
};
exports.viewCategory = (req, res) => {
    const { ITEM } = req.query;
  
    if (!ITEM) {
      return res.status(400).json({ message: "Invalid paramiter" });
    }
  
    CategoryModel.viewCategory(ITEM, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const response = results;
      
      
      res.status(200).json({
        status: "True",response
       
        // message: "Category added successfully",
      });
    });
  };
  exports.addSubCategory = (req, res) => {
    const { PRODUCT_SUB_CATEGORY,PRODUCT_CATEGORY_SYS_ID  } = req.body;
  
    if (!PRODUCT_SUB_CATEGORY|| !PRODUCT_CATEGORY_SYS_ID ) {
      return res.status(400).json({ message: "Subcategory name is required" });
    }
  
    CategoryModel.addSubCategory(PRODUCT_SUB_CATEGORY,PRODUCT_CATEGORY_SYS_ID, (err, results) => {
      if (err) {
        console.log(err);
        
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "SubCategory added successfully",
      });
    });
  };
  exports.viewSubCategory = (req, res) => {
    const { ITEM,PRODUCT_CATEGORY_SYS_ID } = req.query;
  
    if (!ITEM || !PRODUCT_CATEGORY_SYS_ID) {
      return res.status(400).json({ message: "Invalid paramiter" });
    }
  
    CategoryModel.viewSubCategory(ITEM, PRODUCT_CATEGORY_SYS_ID,(err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const response = results;
      
      
      res.status(200).json({
        status: "True",response
       
        // message: "Category added successfully",
      });
    });
  };
  

