const express = require('express');
const router = express.Router();
const { 
    generateQRCode
    // checkLoginStatus
} = require('../controllers/AuthenticationWBMController');

router.get('/generate-qr', generateQRCode);
// router.get('/check-login-status', checkLoginStatus);

module.exports = router;
