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
