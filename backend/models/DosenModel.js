const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/Database.js");

const Dosen = sequelize.define("Dosen", {
    id_dosen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nidn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_whatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true, // This option prevents Sequelize from pluralizing the table name
    timestamps: false, // Include createdAt and updatedAt columns
});

// Define any associations, hooks, or additional model methods here

// Sync the model with the database
(async () => {
    await sequelize.sync();
})();

module.exports = Dosen;
