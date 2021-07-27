const Course = require("../Models/Course");
const sequelize = require('sequelize');

module.exports.course_details = (req, res, next) => {
    const id = req.query.course_id;
    console.log(id)
    Course.findOne({ where: { course_id: id } })
        .then(data => {
            if (!data) {
                const error = new Error("Course Not Found");
                error.statusCode = 404;
                error.data = [{
                    msg: "Course Not Found"
                }]
                throw error;
            } else {
                res.satus(200).json({
                    message: "Course details",
                    course_details: data
                });
            }
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


module.exports.search_courses = (req, res, next) => {
    const course_topic = req.query.course_topic.trim();
    const pageNumber = req.query.pageNumber

    const coursename = `${course_topic}%`
    console.log(coursename)
    console.log("course_topic is " + course_topic);
    Course.findAll({
        where: {
            course_topic: { [sequelize.Op.like]: `${course_topic}%` }
        },
        offset: (pageNumber - 1) * 10,
        limit: 10
    })
        .then(result => {
            if (result.length == 0) {
                const error = new Error(`No more courses of topic ${course_topic}`);
                error.statusCode = 404;
                error.data = [{
                    msg: error.message ? error.message : `No more courses of topic ${course_topic}`
                }]
                throw error;
            } else {
                res.status(200).json({
                    message: "search work successfully",
                    data: result
                })
            }

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
            next(error)
        })

}


module.exports.course_by_teacher = (req, res, next) => {

    const email_id = req.query.email_id.trim();

    Course.findAll({ where: { email_id: email_id } })
        .then(data => {
            if (data.length === 0) {
                const error = new Error("No courses by this teacher")
                error.statusCode = 404;
                error.data = [{
                    msg: error.message ? error.message : "No courses by this teacher"
                }]
                throw error;
            }
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