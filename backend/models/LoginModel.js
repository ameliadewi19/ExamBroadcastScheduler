const { DataTypes } = require('sequelize');
const sequelize = require("../config/Database.js");// Sesuaikan dengan path Anda

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
},
  {
    freezeTableName: true, // This option prevents Sequelize from pluralizing the table name
    timestamps: false, // Include createdAt and updatedAt columns
});

(async () => {
    await sequelize.sync();
})();

module.exports = Admin;