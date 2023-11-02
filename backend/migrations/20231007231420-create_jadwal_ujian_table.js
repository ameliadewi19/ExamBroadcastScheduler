'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JadwalUjian', {
      id_ujian: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_dosen: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Dosen', // This should match the table name for the Dosen model
          key: 'id_dosen',
        },
        defaultValue: null,
      },
      tanggal_ujian: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      waktu_mulai: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      waktu_selesai: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      nama_matakuliah: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      jenis_matakuliah: {
        type: Sequelize.CHAR(2),
        allowNull: false,
      },
      kelas: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      ruangan: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      id_pengawas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Dosen', // This should match the table name for the Dosen model
          key: 'id_dosen',
        },
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('JadwalUjian');
  },
};
