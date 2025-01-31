const CategoryModel = require("../models/masterdatamodels");

/////////////// category code
  exports.addCategory = (req, res) => {
  const { COURSE_CATEGORY_NAME } = req.body;

  if (!COURSE_CATEGORY_NAME) {
    return res.status(400).json({ message: "Category name is required" });
  }

  CategoryModel.addCategory(COURSE_CATEGORY_NAME,1, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  
    res.status(200).json({
      status: "True",
      message: "Category added successfully",
    });
  });
  };
  exports.updateCategory = (req, res) => {
    const { COURSE_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID } = req.body;
  
    if (!COURSE_CATEGORY_NAME|| !COURSE_CATEGORY_SYS_ID) {
      return res.status(400).json({ message: "Course Category name is required" });
    }
  
    CategoryModel.updateCategory(COURSE_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID, 1, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "Course Category updated successfully",
      });
    });
  };
  exports.deleteCategory = (req, res) => {
    const { COURSE_CATEGORY_SYS_ID } = req.body;
  
    CategoryModel.deleteCategory(COURSE_CATEGORY_SYS_ID, 0, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "Course Category Deleted successfully",
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
      return res.status(400).json({ message: "Category sys id and Subcategory name is required" });
    }
  
    CategoryModel.addSubCategory(COURSE_SUB_CATEGORY_NAME,COURSE_CATEGORY_SYS_ID,1, (err, results) => {
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
  exports.updateSubCategory = (req, res) => {
    const { COURSE_SUB_CATEGORY_NAME,COURSE_SUB_CATEGORY_SYS_ID } = req.body;
  
    if (!COURSE_SUB_CATEGORY_NAME|| !COURSE_SUB_CATEGORY_SYS_ID) {
      return res.status(400).json({ message: "Course Sub Category name and course Course sub category sys id is required" });
    }
  
    CategoryModel.updateSubCategory(COURSE_SUB_CATEGORY_NAME,COURSE_SUB_CATEGORY_SYS_ID, 1, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "Course Sub Category updated successfully",
      });
    });
  };
  exports.deleteSubCategory = (req, res) => {
    const { COURSE_SUB_CATEGORY_SYS_ID } = req.body;
  
    CategoryModel.deleteSubCategory(COURSE_SUB_CATEGORY_SYS_ID, 0, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "Course Sub Category Deleted successfully",
      });
    });
  };
  exports.viewSubCategory = (req, res) => {
    const { ITEM,COURSE_SUB_CATEGORY_SYS_ID } = req.query;
  
    if (!ITEM || !COURSE_SUB_CATEGORY_SYS_ID) {
      return res.status(400).json({ message: "Invalid paramiter" });
    }
  
    CategoryModel.viewSubCategory(ITEM, COURSE_SUB_CATEGORY_SYS_ID,(err, results) => {
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
  //////////////// system role code
  exports.addSystemRole = (req, res) => {
    const { SYSTEM_ROLE_NAME } = req.body;
  
    if (!SYSTEM_ROLE_NAME) {
      return res.status(400).json({ message: "System Role name is required" });
    }
  
    CategoryModel.addSystemRole(SYSTEM_ROLE_NAME,1, (err, results) => {
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
    const { SYSTEM_ROLE_NAME,SYSTEM_ROLE_SYS_ID } = req.body;
  
    if (!SYSTEM_ROLE_NAME|| !SYSTEM_ROLE_SYS_ID) {
      return res.status(400).json({ message: "System Role name is required" });
    }
  
    CategoryModel.updateSystemRole(SYSTEM_ROLE_NAME,SYSTEM_ROLE_SYS_ID, 1, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "System Role updated successfully",
      });
    });
  };
  exports.deleteSystemrole = (req, res) => {
    const { SYSTEM_ROLE_SYS_ID } = req.body;
  
    // if ( !SYSTEM_ROLE_SYS_ID) {
    //   return res.status(400).json({ message: "System Role id is required" });
    // }
  
    CategoryModel.deleteSystemrole(SYSTEM_ROLE_SYS_ID, 0, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        status: "True",
        message: "System Role Delete successfully",
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
  

