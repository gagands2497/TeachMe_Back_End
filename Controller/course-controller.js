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
    const course_topic = req.query.course_topic;
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
                const error = new Error("NO MORE COURSES");
                error.statusCode = 404;
                error.data = [{
                    msg: error.message ? error.message : "NO MORE COURSES"
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