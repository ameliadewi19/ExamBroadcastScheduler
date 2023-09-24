const express = require('express');
const router = express.Router();
const { 
    sendConfirmation,
    createConfirmation,
    getConfirmation,
    getConfirmationById,
    updateConfirmation,
    deleteConfirmation 
} = require('../controllers/ConfirmationController');

// Rute untuk mengirim konfirmasi WhatsApp
router.post('/send-confirmation', sendConfirmation);

// Rute CRUD untuk konfirmasi
router.post('/confirmations', createConfirmation);
router.get('/confirmations', getConfirmation);
router.get('/confirmations/:id', getConfirmationById);
router.put('/confirmations/:id', updateConfirmation);
router.delete('/confirmations/:id', deleteConfirmation);

module.exports = router;
