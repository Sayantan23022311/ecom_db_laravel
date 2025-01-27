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
    const { SYSTEM_ROLE_NAME, CREATED_BY } = req.body;
  
    if (!SYSTEM_ROLE_NAME || !CREATED_BY) {
      return res.status(400).json({ message: "System Role name is required" });
    }
    
    // Set the current date for CREATED_DATE
    const CREATED_DATE = new Date();
    const ISACTIVE =1;

    CategoryModel.addSystemRole(SYSTEM_ROLE_NAME,CREATED_BY,(err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "System Role added successfully",
      });
    });
  };
exports.updateSystemRole = (req, res) => {
    const { SYSTEM_ROLE_SYS_ID, SYSTEM_ROLE_NAME, MODIFIED_BY } = req.body;
  
    // Validate required fields
    if (!SYSTEM_ROLE_SYS_ID || !SYSTEM_ROLE_NAME || !MODIFIED_BY ) {
      return res.status(400).json({ message: "Mandatory fields are required" });
    }
  
    // Set the current date for MODIFIED_DATE
    const MODIFIED_DATE = new Date();
    const ISACTIVE =1;
  
    // Call the model method to update the system role
    CategoryModel.updateSystemRole(
      { SYSTEM_ROLE_SYS_ID, SYSTEM_ROLE_NAME, MODIFIED_BY },
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }
  
        // Check if the update affected any rows
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "System Role not found" });
        }
  
        res.status(200).json({
          status: "True",
          message: "System Role updated successfully",
        });
      }
    );
  };
exports.deleteSystemRole = (req, res) => {
    const { SYSTEM_ROLE_SYS_ID, CREATED_BY } = req.body;
  
    // Validate required fields
    if (!SYSTEM_ROLE_SYS_ID || !CREATED_BY) {
      return res.status(400).json({ message: "System Role ID and Created By By are required" });
    }
  
    // Set the current date for MODIFIED_DATE
    const ISACTIVE =0;
  
    // Call the model method to delete (soft delete) the system role
    CategoryModel.deleteSystemRole(
      { SYSTEM_ROLE_SYS_ID, CREATED_BY:false },
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }
  
        // Check if the delete affected any rows (role exists)
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "System Role not found" });
        }
  
        res.status(200).json({
          status: "True",
          message: "System Role deleted successfully",
        });
      }
    );
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
  

