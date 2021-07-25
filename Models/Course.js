const Sequelize = require('sequelize');
const database = require('../database');


const Course = database.define('Course', {
    course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email_id: {//email id of teacher
        type: Sequelize.STRING,
        allowNull: false,
    },
    course_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    course_topic: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    storage_link: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Course;

