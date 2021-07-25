const Sequelize = require('sequelize');

const database = require('../database');

const TakeSession = database.define('TakeSession', {
    student_email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    session_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
    }
});

module.exports = TakeSession;