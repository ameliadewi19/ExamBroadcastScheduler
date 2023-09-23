const Sequelize = require("sequelize");

const db = new Sequelize('exam_bm_scheduler', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

module.exports = db;