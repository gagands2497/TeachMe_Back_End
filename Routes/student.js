const express = require('express');
const router = express.Router();
const studentController = require('../Controller/student-Controller');
const Middleware = require('../Middleware/Auth');

router.get('/student_personal_profile', Middleware.isAuth, studentController.student_personal_profile);

router.get('/course_taken', Middleware.isAuth, studentController.course_taken_history);

router.get('/take_course', Middleware.isAuth, studentController.take_course);


module.exports = router;