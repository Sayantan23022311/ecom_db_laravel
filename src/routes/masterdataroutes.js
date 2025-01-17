const express = require('express');
const { category } = require('../controllers/masterdata'); // Import controller

const router = express.Router();

// Login route
router.post('/add-category', category);

module.exports = router;
