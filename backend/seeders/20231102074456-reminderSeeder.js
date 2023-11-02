const path = require('path');
const configPath = path.join(__dirname, '../config/config.json');
const config = require(configPath);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { username, password, database, host, port, dialect } = config.development;
    
    await queryInterface.bulkInsert('ReminderTemplate', [
      {
        pembuka: 'Halo Bapak/Ibu {nama}, mengingatkan jadwal mengawas besok:',
        message: '{tanggal} pukul {waktu_mulai} - {waktu_selesai} untuk mata kuliah {nama_matakuliah} {jenis_matakuliah}, Kelas {kelas} di ruangan {ruangan}.',
      },
      {
        pembuka: 'Halo Bapak/Ibu {nama}, mengingatkan jadwal mengawas hari ini :',
        message: '{tanggal} pukul {waktu_mulai} - {waktu_selesai} untuk mata kuliah {nama_matakuliah} {jenis_matakuliah}, Kelas {kelas} di ruangan {ruangan}.',
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
