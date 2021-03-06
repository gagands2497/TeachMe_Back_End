require('dotenv').config();
const Sequelize = require('sequelize');


const sequalize = new  Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }

);

module.exports = sequalize;