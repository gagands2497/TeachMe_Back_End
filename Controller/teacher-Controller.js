const Teacher = require('../Models/Teacher');
const Course = require('../Models/Course');

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
                    msg: "Internal Server Error"
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
                    msg: "Internal Server Error"
                }]
            }
            next(err);
        })

}