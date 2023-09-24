const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/Database.js");

const ConfirmationTemplate = sequelize.define("ConfirmationTemplate", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    freezeTableName: true, // This option prevents Sequelize from pluralizing the table name
    timestamps: false, // Include createdAt and updatedAt columns
});

// Define any associations, hooks, or additional model methods here

// Sync the model with the database
(async () => {
    await sequelize.sync();
})();

module.exports = ConfirmationTemplate;
