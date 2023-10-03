const express = require('express');
const multer = require('multer'); 
const {
  getUjian,
  getUjianById,
  createUjian,
  updateUjian,
  deleteUjian,
  downloadExcelTemplate,
} = require('../controllers/JadwalController.js');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage });

router.get('/jadwal-ujian', getUjian);
router.get('/jadwal-ujian/:id', getUjianById);
router.get('/jadwal-ujian/download-template', downloadExcelTemplate)
router.post('/jadwal-ujian', upload.single('excelFile'), createUjian);
router.patch('/jadwal-ujian/:id', updateUjian);
router.delete('/jadwal-ujian/:id', deleteUjian);

module.exports = router;