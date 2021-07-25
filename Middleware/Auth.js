const jwt = require('jsonwebtoken');
const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher');

module.exports.isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const e = new Error("Not Authenticated/Token is wrong");
        e.statusCode = 401;
        e.data = [{
            msg: "Not Authenticated/Token is wrong"
        }]
        throw e;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secret_key');
    } catch (err) {
        err.statusCode = 500;
        err.data = [{
            msg: "Token verification failed Please try again"
        }]
        throw err;
    }

    if (!decodedToken) {
        const error = new Error("Not Authenticated/Token is wrong");
        error.statusCode = 401;
        error.data = [{
            msg: "Not Authenticated/Token is wrong"
        }]
        throw err;
    }
    const email = decodedToken.email_id;
    const userType = decodedToken.userType;
    req.userId = decodedToken.email_id;
    if (userType === "student") {
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
                    req.user = user;
                    next();
                }
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                if (!error.data) {
                    error.data = [{
                        msg: "Internal Server Error"
                    }]
                }
                next(error);
            })
    } else {
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
                    req.user = user;
                    next();
                }
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                if (!error.data) {
                    error.data = [{
                        msg: "Internal Server Error"
                    }]
                }
                next(error);
            })
    }
}