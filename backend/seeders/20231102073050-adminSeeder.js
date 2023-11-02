const path = require('path');
const configPath = path.join(__dirname, '../config/config.json');
const config = require(configPath);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { username, password, database, host, port, dialect } = config.development;
  
    await queryInterface.bulkInsert('Admin', [
      {
        username: 'admin',
        password: '$2b$10$.OuM8dccPaR2WthjpsIrh.kcZffgN64om/RdKOk9VWwzqUzBZMMBi',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};