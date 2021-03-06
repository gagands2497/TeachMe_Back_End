const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const sequalize = require('sequelize');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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
                    // data: resData,
                    message: "Registered"
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
                // internal server error
            }
            if (!err.data) {
                err.data = [{
                    msg: err.message ? err.message : "Internal Server Error"
                }]
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
                    // data: resData,
                    message: "Registered"
                })
            }).catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                    // internal server error
                }
                error.data = [{
                    msg: "Internal Server Error"
                }]
                next(err);
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                // internal server error
            }
            if (!err.data) {
                err.data = [{
                    msg: err.message ? err.message : "Internal Server Error"
                }]
            }
            next(err);
        })
}



module.exports.student_login = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error
    }
    console.log(req.body);
    const email = req.body.email_id;
    const password = req.body.password;
    Student.findOne({ where: { email_id: email } })
        .then(user => {

            if (!user) {
                const error = new Error("User not found Please register first");
                error.statusCode = 404;
                error.data = [{
                    msg: "User not found Please register first",
                }];
                throw error;
            }
            else {
                return bcrypt.compare(password, user.password);
            }
        })
        .then(same => {
            if (!same) {
                const error = new Error("Wrong password");
                error.statusCode = 401;
                error.data = [{
                    msg: "Wrong Password"
                }]
                throw error;
            } else {
                const time = 24 * 60 * 60 * 1000;
                const token = jwt.sign({
                    email_id: email,
                    userType: "student"
                }, "secret_key", { expiresIn: time });
                res.status(201).json({
                    Access_Token: token,
                    message: "Login Student success"
                })
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            if (!err.data) {
                err.data = [{
                    msg: err.message ? err.message : "Internal Server Error"
                }]
            }
            next(err);
        })
}



module.exports.teacher_login = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error
    }
    console.log(req.body);
    const email = req.body.email_id;
    const password = req.body.password;
    Teacher.findOne({ where: { email_id: email } })
        .then(user => {

            if (!user) {
                const error = new Error("User not found Please register first");
                error.statusCode = 404;
                error.data = [{
                    msg: "User not found Please register first"
                }]
                throw error;
            }
            else {
                return bcrypt.compare(password, user.password);
            }
        })
        .then(same => {
            if (!same) {
                const error = new Error("Wrong password");
                error.statusCode = 401;
                error.data = [{
                    msg: "Wrong Password"
                }]
                throw error;
            } else {
                const time = 24 * 60 * 60 * 1000;
                const token = jwt.sign({
                    email_id: email,
                    userType: "teacher"
                }, "secret_key", { expiresIn: time });
                res.status(201).json({
                    Access_Token: token,
                    message: "Login Teacher success"
                })
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            if (!err.data) {
                err.data = [{
                    msg: err.message ? err.message : "Internal Server Error"
                }]
            }
            next(err);
        })
}