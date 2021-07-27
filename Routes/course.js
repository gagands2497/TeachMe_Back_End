const express = require('express');
const router = express.Router();
const courseController = require('../Controller/course-controller');

router.get('/course_details', courseController.course_details);
router.get('/search_courses', courseController.search_courses);


module.exports = router;