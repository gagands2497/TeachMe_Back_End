const express = require('express');
const router = express.Router();
const teacherController = require('../Controller/teacher-Controller');
const Middleware = require('../Middleware/Auth');

router.get('/teacher_personal_profile', Middleware.isAuth , teacherController.teacher_personal_profile);


module.exports = router;