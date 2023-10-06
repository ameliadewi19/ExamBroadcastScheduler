const express = require('express');
const router = express.Router();
const {
    getHistory
} = require('../controllers/ReminderController');

router.get('/reminder', getHistory);

module.exports = router;