const Teacher = require('../Models/Teacher');
const Course = require('../Models/Course');
const { validationResult } = require('express-validator');
const { parse } = require('dotenv');

module.exports.teacher_personal_profile = (req, res, next) => {
    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const email = req.userId;
    Teacher.findOne({ where: { email_id: email } })
        .then(user => {
            if (!user) {
                const error = new Error("user not found");
                error.statusCode = 404;
                error.data = [{
                    msg: "User not found"
                }]
                throw error;
            } else {
                res.status(200).json({
                    userData: user
                })
            }
        }).catch(err => {
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


module.exports.create_course = (req, res, next) => {
    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    }

    const email = req.userId;
    const user = req.user;

    user.createCourse({})
        .then(data => {
            res.status(200).json({
                message: 'Course created successfully'
            })
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

module.exports.update_data = (rea, res, next) => {

    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error
    }

    user.update()
        .then(data => {
            res.status.json({
                message: "Profile Updated Successfully"
            })
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


module.exports.create_session = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error
    }
    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    }

    const user = req.user;

    user.createOfferSession({
        topic_of_session: req.body.topic_of_session,
        cost_of_session: parseInt(req.body.cost_of_session),
        email_id: req.userId
    })
        .then(data => {
            res.status(201).json({
                message: 'Session created',
                data: data
            })
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