const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: process.env.DB_DIALECT,
});

console.log(
    process.env.DB_NAME,
    process.env.DB_USER,
);

// Export the configured Sequelize instance
module.exports = sequelize;
