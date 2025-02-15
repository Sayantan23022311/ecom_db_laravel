const express = require('express');
const addressRoutes = require('../controllers/address'); 
//const verifyToken = require("../middleware/loginmiddleware");

// Import controller

const router = express.Router();

// address route
router.get('/get-user',userRoutes.viewUser);
module.exports = router;