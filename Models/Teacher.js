const Sequelize = require('sequelize');
const database = require('../database');
const Teacher = database.define('Teacher', {
    email_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    // teacher_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
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
    },
    description: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    profile_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    topic_of_live_courses: {
        type: Sequelize.STRING,
        allowNull: true,
    },

});

module.exports = Teacher;



