const Sequelize = require('sequelize');

const database = require('../database');

const Student = database.define('Student', {
    email_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ph_number: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Student;

