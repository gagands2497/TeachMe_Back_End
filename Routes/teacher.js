const express = require('express');
const router = express.Router();
const teacherController = require('../Controller/teacher-Controller');
const Middleware = require('../Middleware/Auth');
const { body } = require('express-validator');

router.get('/personal_profile', Middleware.isAuth, teacherController.teacher_personal_profile);

router.post('/update_data', Middleware.isAuth, teacherController.update_data);

router.get('/create_course', Middleware.isAuth, teacherController.create_course);

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