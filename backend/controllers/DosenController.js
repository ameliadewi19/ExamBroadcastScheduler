const Dosen = require("../models/DosenModel.js");
const JadwalUjian = require("../models/JadwalModel.js");
const {Sequelize} = require("sequelize");
const xlsx = require("xlsx");
const path = require('path');


const getDosen = async(req, res) =>{
    try {
        const response = await Dosen.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const getDosenById = async(req, res) =>{
    try {
        const response = await Dosen.findOne({
            where:{
                id_dosen: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const createBulkDosen = async(req, res) =>{
    try {
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
      "Kode Dosen Pengampu": "kode_dosen",
      "Nama Dosen": "nama",
      "NIP": "nip",
      "NIDN": "nidn",
      "No Whatsapp": "no_whatsapp",
    };
    const dosenDataArray = [];
    for (const row of data) {

      const dosenData = {
        // Map the Excel column name to the database field name
        [columnMappings["Kode Dosen Pengampu"]]: row["Kode Dosen Pengampu"],
        [columnMappings["Nama Dosen"]]: row["Nama Dosen"],
        [columnMappings["NIP"]]: row["NIP"],
        [columnMappings["NIDN"]]: row["NIDN"],
        [columnMappings["No Whatsapp"]]: row["No Whatsapp"],
      };
      dosenDataArray.push(dosenData);
    }
    console.log(dosenDataArray);
    // Create JadwalUjian records from the Excel data
    await Dosen.bulkCreate(dosenDataArray);
    res.status(201).json({ message: 'Dosen records created from Excel.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to create Dosen records from Excel.' });
  }
};

const createDosen = async (req, res) => {
    try {
        // Dapatkan data dosen dari body request
        const { nip, nidn, nama,kode_dosen,no_whatsapp} = req.body;
        // Buat objek Dosen baru
        const newDosen = await Dosen.create({
            nip,
            nidn,
            nama,
            kode_dosen,
            no_whatsapp
        });

        // Kirim respon sukses
        res.status(201).json(newDosen);
    } catch (error) {
        // Tangani kesalahan jika ada
        console.error(error.message);
        res.status(500).json({ error: "Gagal membuat dosen baru" });
    }
};


async function updateDosen(req, res) {
    const dosenId = req.params.id;
    try {
        const updatedDosen = await Dosen.update(req.body, {
            where: { id_dosen: dosenId },
        });
        if (updatedDosen[0] === 1) {
            res.status(200).json({ message: 'Dosen berhasil diperbarui.' });
        } else {
            res.status(404).json({ error: 'Dosen tidak ditemukan.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memperbarui Dosen.' });
    }
}

const deleteDosen = async (req, res) => {
    try {
      const downloadExcelTemplate = (req, res) => {
        const templateFilePath = path.join(__dirname, 'public', 'excel-template.xlsx');
        res.download(templateFilePath, 'excel-template.xlsx', (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to download template file.' });
          }
        });
      };
      const dosenId = req.params.id;
  
      // Find and update all JadwalUjian entries where id_dosen or id_pengawas matches dosenId
      await JadwalUjian.update(
        {
          id_dosen: null,
          id_pengawas: null,
        },
        {
          where: {
            [Sequelize.Op.or]: [
              { id_dosen: dosenId },
              { id_pengawas: dosenId },
            ],
          },
        }
      );
  
      // After updating JadwalUjian entries, you can delete the Dosen
      await Dosen.destroy({
        where: {
          id_dosen: dosenId,
        },
      });
  
      res.status(200).json({ message: "Dosen Deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };  


  const downloadExcelTemplate = (req, res) => {
    const templateFilePath = path.join(__dirname, 'public/template/', 'excel-template.xlsx');
    res.download(templateFilePath, 'excel-template.xlsx', (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to download template file.' });
      }
    });
  };

module.exports={
    getDosen, 
    getDosenById,
    createBulkDosen,
    updateDosen,
    deleteDosen,
    downloadExcelTemplate,
    createDosen
}