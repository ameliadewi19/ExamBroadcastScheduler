// import Dosen from "DosenModel.js";
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");
const Dosen = require("./DosenModel.js");
    
const JadwalUjian = sequelize.define("JadwalUjian", {
    id_ujian: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_dosen: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Dosen, // Mengacu pada model Dosen
            key: "id_dosen", // Kolom kunci di model Dosen
        },
        defaultValue: null,
    },
    tanggal_ujian: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    waktu_mulai: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    waktu_selesai: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    nama_matakuliah: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    jenis_matakuliah: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    kelas: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ruangan: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    id_pengawas: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Dosen, // Mengacu pada model Dosen
            key: "id_dosen", // Kolom kunci di model Dosen
        },
        defaultValue: null,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

(async () => {
    await sequelize.sync();
})();

module.exports = JadwalUjian;