const express = require('express');
const userRoutes = require('../controllers/user'); 
//const verifyToken = require("../middleware/loginmiddleware");

// Import controller

const router = express.Router();

// User route
router.post('/add-post-user', userRoutes.addUser);
module.exports = router;