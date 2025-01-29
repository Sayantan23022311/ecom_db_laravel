const express = require('express');
const  category  = require('../controllers/masterdata'); 
const verifyToken = require("../middleware/loginmiddleware");
// Import controller


const router = express.Router();

// Login route
router.post('/add-category',verifyToken, category.addCategory);
router.get('/get-category',verifyToken, category.viewCategory);
router.post('/add-subcategory', category.addSubCategory);
router.get('/get-subcategory',verifyToken, category.viewSubCategory);
<<<<<<< HEAD
router.post('/add-systemrole',verifyToken, category.addSystemRole);
router.post('/update-systemrole', category.updateSystemRole);
//router.post('/add-systemrole',verifyToken, category.deleteSystemRole);
router.get('/get-systemrole', verifyToken,category.viewSystemRole);
=======
router.post('/add-systemrole', category.addSystemRole);
router.post('/update-systemrole', category.updateSystemRole);
router.post('/delete-systemrole', category.deleteSystemrole);
router.get('/get-systemrole',category.viewSystemRole);
>>>>>>> origin/riju
module.exports = router;
