const Sequelize = require('sequelize');

const database = require('../database');

const OfferSession = database.define('OfferSession', {
    session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email_id: {//email_id of teacher who is creating the course
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    topic_of_session: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // cost of session is per person per hour
    cost_of_session: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = OfferSession;


