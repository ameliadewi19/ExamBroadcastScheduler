const { Sequelize } = require('sequelize');

// Configure the Sequelize instance
const sequelize = new Sequelize('exam_bm_scheduler', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres', // Use the appropriate dialect for PostgreSQL
});

// Export the configured Sequelize instance
module.exports = sequelize;
