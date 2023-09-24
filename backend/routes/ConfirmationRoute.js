const express = require('express');
const router = express.Router();
const { sendConfirmation } = require('../controllers/ConfirmationController');

// Definisikan rute untuk mengirim pesan WhatsApp
router.post('/send-confirmation', sendConfirmation);

module.exports = router;
