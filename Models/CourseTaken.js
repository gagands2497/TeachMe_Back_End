const Sequelize = require('sequelize');//change if gives error
const database = require('../database');
const CourseTaken = database.define('CourseTaken', {
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    email_id: {//email_id of the student taking the course
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = CourseTaken;

