const express = require('express');
const router = express.Router();
const teacherController = require('../Controller/teacher-Controller');
const Middleware = require('../Middleware/Auth');
const { body } = require('express-validator');

router.get('/personal_profile', Middleware.isAuth, teacherController.teacher_personal_profile);
router.post('/update_data', Middleware.isAuth, teacherController.update_data);
router.post('/create_course',
    body("course_name").
        custom(val => {
            if (val) {
                if (val.length > 10) {
                    return Promise.reject("course name must be at most 10 characters")
                } else {
                    return Promise.resolve("validated course_name")
                }
            } else {
                return Promise.reject("Course name cannot be empty")
            }
        })
    ,
    body("course_topic")
        .custom(val => {
            if (val) {
                if (val.length > 10) {
                    return Promise.reject("Course topic must be at most 10 characters")
                } else {
                    return Promise.resolve("validated Topic")
                }
            } else {
                return Promsie.reject("Course topic cannot be empty")
            }
        })
    ,
    body("description")
        .custom(val => {
            if (val) {
                if (val.length > 30) {
                    return Promise.reject("description must length 30")
                } else if (val.length < 10) {
                    return Promise.reject("description must be of atleast length 10")
                } else {
                    return Promise.resolve("Validated description")
                }
            } else {
                return Promise.reject("Description cannot be empty")
            }
        })
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