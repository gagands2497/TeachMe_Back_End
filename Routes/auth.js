const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher');
const authController = require('../Controller/auth-controller');


router.post('/student_signup',
    body('email_id')
        .trim()
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
        .trim()
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
        .isLength({ min: 100 })
        .withMessage("Description should be min of 100 chars")
        .custom(val => {
            if (val.length > 500) {
                return Promise.reject("Description must be of less than 500 charachters");
            } else {
                return true;
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




router.post('/student_login',
        
    body('email_id')
        .trim()
        .isEmail()
        .withMessage("Not a valid Email"),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be of min lenght 8")
    , authController.student_login);


router.post('/teacher_login',

    body('email_id')
        .trim()
        .isEmail()
        .withMessage("Not a valid Email"),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be of min lenght 8")
    , authController.teacher_login);

module.exports = router;