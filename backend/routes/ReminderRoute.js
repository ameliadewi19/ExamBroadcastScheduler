const express = require('express');
const { sendReminder } = require('../controllers/ReminderController');
const router = express.Router();

router.post('/send-reminder', sendReminder);

module.exports = router;