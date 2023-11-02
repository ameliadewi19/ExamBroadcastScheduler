const path = require('path');
const configPath = path.join(__dirname, '../config/config.json');
const config = require(configPath);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { username, password, database, host, port, dialect } = config.development;
    
    await queryInterface.bulkInsert('ConfirmationTemplate', [
      {
        pembuka: 'Hallo Ibu/Bapak',
        message: '{{name}}, apakah bersedia untuk mengawas ujian berikut: \nMata Kuliah: {{matkul}}\nTanggal: {{tanggal}}\nWaktu: {{waktu_mulai}} - {{waktu_selesai}}\nRuangan: {{ruangan}} \nKelas: {{kelas}}',
      },
      {
        pembuka: 'Hai Ibu/Bapak',
        message: '{{name}}, apakah bersedia untuk mengawas ujian mata kuliah {{matkul}}, pada tanggal {{tanggal}} kelas {{kelas}}, dari pukul {{waktu_mulai}} sampai {{waktu_selesai}}, di ruangan {{ruangan}} ',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
