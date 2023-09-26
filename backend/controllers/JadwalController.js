const Dosen = require("../models/DosenModel.js");
const Ujian = require("../models/JadwalModel.js");

const getUjian = async (req, res) => {
  try {
    const response = await Ujian.findAll({
      include:Dosen,
    });
    res.status(200).json(response);
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
