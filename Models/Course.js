const Sequelize = require('sequelize');
const database = require('../database');


const Course = database.define('Course', {
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
    },
    teacher_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course_topic: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storage_link: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Course;

