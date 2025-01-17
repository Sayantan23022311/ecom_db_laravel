const express = require('express');
const  category  = require('../controllers/masterdata'); 
// Import controller
console.log("Controller import:", category);

const router = express.Router();

// Login route
router.post('/add-category', category.addCategory);
router.post('/get-category', category.viewCategory);

module.exports = router;
