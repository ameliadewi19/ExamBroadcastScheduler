const express = require('express');
const router = express.Router();
const {
    getHistory, getReminders, sendDataToClient, getReminderById, updateReminder
} = require('../controllers/ReminderController');

router.get('/reminder', getReminders, getHistory, sendDataToClient);
router.get('/reminder/:id', getReminderById)
router.patch('/reminder/:id', updateReminder)

module.exports = router;