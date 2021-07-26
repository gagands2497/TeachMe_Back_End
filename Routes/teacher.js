const express = require('express');
const router = express.Router();
const teacherController = require('../Controller/teacher-Controller');
const Middleware = require('../Middleware/Auth');
const { body } = require('express-validator');

router.get('/personal_profile', Middleware.isAuth, teacherController.teacher_personal_profile);
router.post('/update_data', Middleware.isAuth, teacherController.update_data);
router.post('/create_course',
    body("course_name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Course name must be of at least 5 characters")
    ,
    body("course_topic")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Course topic must be of at least 5 characters")
    ,
    body("description")
        .trim()
        .isLength({ min: 15, max: 30 })
        .withMessage("Description must be of at least 15 characters and atmost 30 characters")
    ,
    Middleware.isAuth, teacherController.create_course);


router.post('/upload_profile_image', Middleware.isAuth, teacherController.upload_profile_image);
router.post('/create_session',
    body('cost_of_session')
        .custom(val => {
            console.log(val);
            try {
                val = parseInt(val);
                return true;
            }
            catch (err) {
                console.log(err.message);
                return Promise.reject("cost must be numeric and cannot be null");
            }
        })
    ,
    body("topic_of_session")
        .isLength({ min: 10 })
        .withMessage("minimun length of the topic must be 10 and it should be relevant")
    , Middleware.isAuth, teacherController.create_session);

module.exports = router;