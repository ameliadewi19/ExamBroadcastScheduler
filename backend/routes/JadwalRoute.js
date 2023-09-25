const express = require('express');
const {
  getUjian,
  getUjianById,
  createUjian,
  updateUjian,
  deleteUjian
} = require('../controllers/JadwalController.js');

const router = express.Router();

router.get('/jadwal-ujian', getUjian);
router.get('/jadwal-ujian/:id', getUjianById);
router.post('/jadwal-ujian', createUjian);
router.patch('/jadwal-ujian/:id', updateUjian);
router.delete('/jadwal-ujian/:id', deleteUjian);

module.exports = router;