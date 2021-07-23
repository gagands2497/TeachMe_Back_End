const Teacher = require('../Models/Teacher');


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
                throw error;
            } else {
                res.status(200).json({
                    userData : user
                })
            }
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
