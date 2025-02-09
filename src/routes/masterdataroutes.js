const express = require('express');
const  category  = require('../controllers/masterdata'); 
const verifyToken = require("../middleware/loginmiddleware");
// Import controller


const router = express.Router();

// Login route
router.post('/add-category', category.addCategory);
router.post('/update-category', category.updateCategory);
router.post('/delete-category', category.deleteCategory);
router.get('/get-category', category.viewCategory);
router.post('/add-subcategory', category.addSubCategory);
router.post('/update-subcategory', category.updateSubCategory);
router.post('/delete-subcategory', category.deleteSubCategory);
router.get('/get-subcategory', category.viewSubCategory);
router.post('/add-systemrole', category.addSystemRole);
router.post('/update-systemrole', category.updateSystemRole);
router.post('/delete-systemrole', category.deleteSystemrole);
router.get('/get-systemrole',category.viewSystemRole);
router.get('/get-masterdataname',category.viewMasterDataName);
module.exports = router;
