const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/Database.js");

const HistoryReminder = sequelize.define("HistoryReminder", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    freezeTableName: true, // This option prevents Sequelize from pluralizing the table name
    timestamps: false, // Include createdAt and updatedAt columns
});

// Define any associations, hooks, or additional model methods here

// Sync the model with the database
(async () => {
    await HistoryReminder.sync();
})();

module.exports = HistoryReminder;
