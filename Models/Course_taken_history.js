const Sequelize = require('sequelize');//change if gives error
const database = require('../database');
const Course_taken_history = database.define('Course_taken_history', {
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    student_email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    starting_date: {
        type: DataTypes.DATEONLY,
        allowNull:false        
    }
});

module.exports = Course_taken_history;

