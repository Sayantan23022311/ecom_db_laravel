const CategoryModel = require("../models/masterdatamodels");

  exports.addCategory = (req, res) => {
  const { COURSE_CATEGORY_NAME } = req.body;

  if (!COURSE_CATEGORY_NAME) {
    return res.status(400).json({ message: "Category name is required" });
  }

  CategoryModel.addCategory(COURSE_CATEGORY_NAME, (err, results) => {
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
    const { COURSE_SUB_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID  } = req.body;
  
    if (!COURSE_SUB_CATEGORY_NAME|| !COURSE_CATEGORY_SYS_ID ) {
      return res.status(400).json({ message: "Subcategory name is required" });
    }
  
    CategoryModel.addSubCategory(COURSE_SUB_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID, (err, results) => {
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
    const { ITEM,COURSE_CATEGORY_SYS_ID } = req.query;
  
    if (!ITEM || !COURSE_CATEGORY_SYS_ID) {
      return res.status(400).json({ message: "Invalid paramiter" });
    }
  
    CategoryModel.viewSubCategory(ITEM, COURSE_CATEGORY_SYS_ID,(err, results) => {
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
  exports.addSystemRole = (req, res) => {
    const { SYSTEM_ROLE_NAME } = req.body;
  
    if (!SYSTEM_ROLE_NAME) {
      return res.status(400).json({ message: "System Role name is required" });
    }
  
    CategoryModel.addSystemRole(SYSTEM_ROLE_NAME, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "System Role added successfully",
      });
    });
  };
  exports.viewSystemRole = (req, res) => {
    const { ITEM } = req.query;
  
    if (!ITEM) {
      return res.status(400).json({ message: "Invalid paramiter" });
    }
  
    CategoryModel.viewSystemRole(ITEM,(err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const response = results;
      
      
      res.status(200).json({
        status: "True",response
       
      });
    });
  };
  

