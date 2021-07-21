const Sequelize = require('sequelize');

const database = require('../database');

const Session_offered = database.define('Session_offered', {
    session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    teacher_email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    },
    topic_of_session: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // cost of session is per person per hour
    cost_of_session: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

module.exports = Session_offered;


