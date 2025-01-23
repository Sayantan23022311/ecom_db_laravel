const express = require('express');
const  category  = require('../controllers/masterdata'); 
// Import controller


const router = express.Router();

// Login route
router.post('/add-category', category.addCategory);
router.get('/get-category', category.viewCategory);
router.post('/add-subcategory', category.addSubCategory);
router.get('/get-subcategory', category.viewSubCategory);
router.post('/add-systemrole', category.addSystemRole);
router.get('/get-systemrole', category.viewSystemRole);
module.exports = router;
