const express = require('express');
const { login } = require('../controllers/auth'); // Import controller
const verifyToken = require("../middleware/loginmiddleware");
const router = express.Router();

// Login route
router.post('/login', login);

module.exports = router;
