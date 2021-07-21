const Sequelize = require('sequelize');

const database = require('../database');

const Session_enrolled = database.define('Session_enrolled', {
    student_email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    session_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    }
});

module.exports = Session_enrolled;