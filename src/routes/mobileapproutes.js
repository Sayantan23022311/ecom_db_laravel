const express = require('express');
const { login } = require('../controllers/auth'); // Import controller

const router = express.Router();

// Login route
//router.post('/mobileapp-login', login);

module.exports = router;
