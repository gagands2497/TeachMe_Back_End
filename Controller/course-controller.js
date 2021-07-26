const Course = require("../Models/Course");


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


module.exports.