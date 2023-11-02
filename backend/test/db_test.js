const { Sequelize } = require('sequelize');

// Konfigurasi koneksi Sequelize ke database tes
const sequelize = new Sequelize('test_exam_scheduler', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres', // Sesuaikan dengan jenis database yang digunakan
});

// Eksport objek Sequelize untuk digunakan dalam pengujian
module.exports = sequelize;