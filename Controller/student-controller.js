const Student = require('../Models/Student');
const CourseTaken = require('../Models/CourseTaken');

module.exports.student_personal_profile = (req, res, next) => {
    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const email = req.userId;
    Student.findOne({ where: { email_id: email } })
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


module.exports.course_taken_history = (req, res, next) => {
    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const email = req.userId;
    const user = req.user;

    CourseTaken.findAll({ where: { email_id: email } })
        .then(history => {
            if (history.length === 0) {
                const error = new Error();
                error.statusCode = 201;
                error.data = [{
                    msg: "Student has not Taken any course"
                }]
                throw error;
            } else {
                res.status(200).json({
                    message: "course history",
                    courseTaken: history
                })
            }

        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            if (!error.data) {
                error.data = [{
                    msg: err.message ? err.message : "Internal Server Error"
                }]
            }
            next(error);
        })

}


module.exports.take_course = (req, res, next) => {
    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    }
    else {
        const user = req.user;
        user.createCourseTaken({
            course_id: parseInt(req.query.course_id),
            email_id: req.userId
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                if (!error.data) {
                    error.data = [{
                        msg: err.message ? err.message : "Internal Server Error"
                    }]
                }
                next(error);
            })
    }

}


module.exports.enroll_session = (req, res, next) => {
    if (!req.userId) {
        const error = new Error('User not authenticated');
        error.statusCode = 401;
        throw error;
    } else {
        const email = req.userId;
        const session_id = req.query.session_id;

        user.createTakeSession({
            email_id: email,
            session_id: session_id
        })
            .then(data => {
                res.status(200).json({
                    message: "Enrolled Successfully"
                })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                if (!error.data) {
                    error.data = [{
                        msg: error.message ? error.message : "Internal Server Error"
                    }]
                }
                next(error);
            })
    }
}


module.exports.update_data = (req, res, next) => {
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