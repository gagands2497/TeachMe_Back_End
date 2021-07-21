const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher');
const authController = require('../Controller/auth-controller');


router.post('/student_signup',
    body('email_id')
        .isEmail()
        .withMessage("Please Enter a valid Email")
        .custom(value => {
            return Student.findOne({ where: { email_id: value } }).then(stu => {
                if (stu) {
                    return Promise.reject('E-mail is already in use');
                }
            });
        })
    ,
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be of greater than 8 chars"),
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("name cannot be empty"),
    body('ph_number')
        .trim()
        .isLength(10)
        .withMessage("Phone number lenght must be exactly 10")

    , authController.student_signup)



router.post('/teacher_signup',
    body('email_id')
        .isEmail()
        .withMessage("Please Enter a valid Email")
        .custom(value => {
            return Teacher.findOne({ where: { email_id: value } }).then(teacher => {
                if (teacher) {
                    return Promise.reject('E-mail is already in use');
                }
            });
        })
    ,
    body('description')
        .trim()
        .isLength({ min: 100 })
        .withMessage("Description should be min of 100 chars")
        .custom(val => {
            if (val.length > 1000) {
                return Promise.reject("Description must be max length 1000 chars");
            }
        })
    ,
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be of greater than 8 chars"),
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("name cannot be empty"),
    body('ph_number')
        .trim()
        .isLength(10)
        .withMessage("Phone number lenght must be exactly 10")

    , authController.teacher_signup)



router.get('/', (req, res) => {
    res.send("HYE");
})


module.exports = router;