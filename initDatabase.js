const database = require('./database');
const Student = require('./Models/Student');
const Teacher = require('./Models/Teacher');
const CourseTaken = require('./Models/CourseTaken');
const Sequelize = require('sequelize');
const TakeSession = require('./Models/TakeSession');
const OfferSession = require('./Models/OfferSession');
const Course = require('./Models/Course');
// A student can take multiple courses
// so therefore this is a one to many relation
CourseTaken.belongsTo(Student, {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "email_id"
});//usig associations
Student.hasMany(CourseTaken);

TakeSession.belongsTo(Student, {
    contraints: true,
    onDelete: "CASCADE",
    foreignKey: "email_id"
});
Student.hasMany(TakeSession);


OfferSession.belongsTo(Teacher, {
    onDelete: "CASCADE",
    constraints: true,
    foreignKey: "email_id"
})

Teacher.hasMany(OfferSession);//session created by the teacher

Course.belongsTo(Teacher, {
    constraints: true,
    ondelete: "CASCADE",
    foreignKey: "email_id"
})
Teacher.hasMany(Course);//courses created by the teacher

module.exports.init = () => {
    // flag that force should be true or false
    database.sync({ force: true }).then(res => {
        console.log(" required database created ");
    }).catch(err => {
        console.log(err.message);
    })
}