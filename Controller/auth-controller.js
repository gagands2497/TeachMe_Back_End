const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const sequalize = require('sequelize');


module.exports.student_signup = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error
    }
    const email = req.body.email_id;
    const name = req.body.name;
    const password = req.body.password;
    const ph_number = req.body.ph_number;
    // we need to validate the data in routes
    bcrypt
        .hash(password, 12)
        .then(hashpw => {
            Student.create({
                email_id: email,
                password: hashpw,
                name: name,
                ph_number: ph_number
            }).then(resData => {
                res.status(201).json({
                    data: resData,
                    message: "Student Registered"
                })
            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                    // Internal server error
                }
                next(err);
            })
        }).catch(err => {
            if (!err.statusCode) {

                err.statusCode = 500;
                err.mesaage = "failed to hash the password"
                // internal server error
            }
            next(err);
        })
}


module.exports.teacher_signup = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error
    }
    const email = req.body.email_id;
    const name = req.body.name;
    const password = req.body.password;
    const ph_number = req.body.ph_number;
    const description = req.body.description;
    // we need to validate the data in routes
    bcrypt
        .hash(password, 12)
        .then(hashpw => {
            Teacher.create({
                email_id: email,
                password: hashpw,
                name: name,
                ph_number: ph_number,
                description: description
            }).then(resData => {
                res.status(201).json({
                    data: resData,
                    message: "Teacher Registered"
                })
            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                    // internal server error
                }
                next(err);
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                // internal server error
            }
            next(err);
        })
}