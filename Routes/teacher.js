const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher');
const teacherController = require('../Controller/teacher');
const { isAuth } = require('../Middleware/is-auth');

router.get('/teacher_personal_profile', isAuth, teacherController.teacher_personal_profile);


module.exports = router;