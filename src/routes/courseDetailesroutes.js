const express = require('express');
const courseRoutes = require('../controllers/courseDetailes'); 
const upload = require("../middleware/uploadfile");
//const verifyToken = require("../middleware/loginmiddleware");

// Import controller

const router = express.Router();

// User route
router.post('/add-course-detailes',upload.single("COURSE_IMAGE"), courseRoutes.addCourse);
module.exports = router;