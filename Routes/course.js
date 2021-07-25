const express = require('express');
const router = express.Router();
const courseController = require('../Controller/course-controller');

router.get('/course_details', courseController.course_details);

module.exports = router;