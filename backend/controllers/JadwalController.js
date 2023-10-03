const Ujian = require("../models/JadwalModel.js");
const { Sequelize } = require("sequelize");
const xlsx = require("xlsx");
const { format } = require('date-fns');
const JadwalUjian = require('../models/JadwalModel.js');
const sequelize = require("../config/Database.js");
const path = require('path');

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

    const results = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Gagal mendapatkan data ujian." });
  }
};

const getUjianById = async (req, res) => {
  const { id } = req.params;
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
        "Dosen" dosen_pengawas ON jadwal.id_pengawas = dosen_pengawas.id_dosen
      WHERE
        jadwal.id_ujian = :id
    `;

    const response = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (response.length === 0) {
      res.status(404).json({ error: "Data ujian tidak ditemukan." });
    } else {
      res.status(200).json(response[0]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Gagal mendapatkan data ujian." });
  }
};


const createUjian = async (req, res) => {
  try {
    // Check if a file was uploaded in the request
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No Excel file uploaded.' });
    }

    // Read the Excel file using xlsx
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

    // Assuming your Excel file has a single worksheet, use the first one
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the worksheet data to an array of objects
    const data = xlsx.utils.sheet_to_json(worksheet);
    const columnMappings = {
      "Kode Dosen Pengampu": "id_dosen",
      "Tanggal Ujian": "tanggal_ujian",
      "Waktu Mulai": "waktu_mulai",
      "Waktu Selesai": "waktu_selesai",
      "Nama Matakuliah": "nama_matakuliah",
      "Jenis Mata Kuliah": "jenis_matakuliah",
      "Kelas": "kelas",
      "Ruangan": "ruangan",
      "Kode Dosen Pengawas": "id_pengawas",
    };
    const jadwalUjianDataArray = [];
    for (const row of data) {
      const excelDate = row["Tanggal Ujian"]; // Get the date in Excel format
      const postgresDate = parseExcelDate(excelDate); // Convert to PostgreSQL format

      const jadwalUjianData = {
        // Map the Excel column name to the database field name
        [columnMappings["Kode Dosen Pengampu"]]: row["Kode Dosen Pengampu"],
        [columnMappings["Tanggal Ujian"]]: postgresDate,
        [columnMappings["Waktu Mulai"]]: row["Waktu Mulai"],
        [columnMappings["Waktu Selesai"]]: row["Waktu Selesai"],
        [columnMappings["Nama Matakuliah"]]: row["Nama Matakuliah"],
        [columnMappings["Jenis Mata Kuliah"]]: row["Jenis Mata Kuliah"],
        [columnMappings["Kelas"]]: row["Kelas"],
        [columnMappings["Ruangan"]]: row["Ruangan"],
        [columnMappings["Kode Dosen Pengawas"]]: row["Kode Dosen Pengawas"],
      };
      jadwalUjianDataArray.push(jadwalUjianData);
    }
    console.log(jadwalUjianDataArray);
    // Create JadwalUjian records from the Excel data
    await JadwalUjian.bulkCreate(jadwalUjianDataArray);
    res.status(201).json({ message: 'Jadwal Ujian records created from Excel.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to create Jadwal Ujian records from Excel.' });
  }
};

// Function to parse Excel date format (29/09/2023) to PostgreSQL date format (2023-09-29)
function parseExcelDate(excelDate) {
  const [day, month, year] = excelDate.split('/').map(Number);
  // Assuming the Excel date format is DD/MM/YYYY
  // Use date-fns format to convert to PostgreSQL date format (YYYY-MM-DD)
  return format(new Date(year, month - 1, day), 'yyyy-MM-dd');
}

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
  try {// Function to download the Excel template file
    const downloadExcelTemplate = (req, res) => {
      const templateFilePath = path.join(__dirname, 'public', 'excel-template.xlsx');
      res.download(templateFilePath, 'excel-template.xlsx', (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Failed to download template file.' });
        }
      });
    };
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

// Function to download the Excel template file
const downloadExcelTemplate = (req, res) => {
  const templateFilePath = path.join(__dirname, 'public/template/', 'excel-template.xlsx');
  res.download(templateFilePath, 'excel-template.xlsx', (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to download template file.' });
    }
  });
};

module.exports = {
  getUjian,
  getUjianById,
  createUjian,
  updateUjian,
  deleteUjian,
  downloadExcelTemplate,
};