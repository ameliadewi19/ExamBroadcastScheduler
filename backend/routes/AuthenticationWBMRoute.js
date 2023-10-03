const express = require('express');
const router = express.Router();
const { 
    generateQRCode,
} = require('../controllers/AuthenticationWBMController');

router.get('/generate-qr', generateQRCode);

module.exports = router;
