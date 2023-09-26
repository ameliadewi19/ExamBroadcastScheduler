const Dosen = require("../models/DosenModel.js");
const Ujian = require("../models/JadwalModel.js");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");
const getUjian = async (req, res) => {
  try {
    const query = `
      SELECT
        jadwal.id_ujian,
        jadwal.id_dosen,
        jadwal.id_pengawas,
        jadwal.tanggal_ujian,
        jadwal.waktu_mulai,
        jadwal.waktu_selesai,
        jadwal.nama_matakuliah,
        jadwal.jenis_matakuliah,
        jadwal.kelas,
        jadwal.ruangan,
        dosen_ujian.id_dosen AS id_dosen_ujian,
        dosen_ujian.nip AS nip_dosen_ujian,
        dosen_ujian.nidn AS nidn_dosen_ujian,
        dosen_ujian.nama AS nama_dosen_ujian,
        dosen_ujian.no_whatsapp AS no_whatsapp_dosen_ujian,
        dosen_pengawas.id_dosen AS id_dosen_pengawas,
        dosen_pengawas.nip AS nip_dosen_pengawas,
        dosen_pengawas.nidn AS nidn_dosen_pengawas,
        dosen_pengawas.nama AS nama_dosen_pengawas,
        dosen_pengawas.no_whatsapp AS no_whatsapp_dosen_pengawas
      FROM
        "JadwalUjian" jadwal
      JOIN
        "Dosen" dosen_ujian ON jadwal.id_dosen = dosen_ujian.id_dosen
      JOIN
        "Dosen" dosen_pengawas ON jadwal.id_pengawas = dosen_pengawas.id_dosen;
    `;

    const [results, metadata] = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

    res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Gagal mendapatkan data ujian." });
  }
};

const getUjianById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Ujian.findOne({
      where: {
        id_ujian: id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Gagal mendapatkan data ujian." });
  }
};

const createUjian = async (req, res) => {
  try {
    const newUjian = await Ujian.create(req.body);
    res.status(201).json(newUjian);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Gagal membuat ujian baru." });
  }
};

const updateUjian = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUjian = await Ujian.update(req.body, {
      where: {
        id_ujian: id,
      },
    });
    if (updatedUjian[0] === 1) {
      res.status(200).json({ message: "Ujian berhasil diperbarui." });
    } else {
      res.status(404).json({ error: "Ujian tidak ditemukan." });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Gagal memperbarui ujian." });
  }
};

const deleteUjian = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Ujian.destroy({
      where: {
        id_ujian: id,
      },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Ujian tidak ditemukan." });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Gagal menghapus ujian." });
  }
};

module.exports = {
  getUjian,
  getUjianById,
  createUjian,
  updateUjian,
  deleteUjian,
};
