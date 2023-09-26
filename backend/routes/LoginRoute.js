const express= require("express");
const {
    getAdmin,
    login
} = require("../controllers/LoginController.js");

const router = express.Router();

router.get('/admin', getAdmin);
router.post('/login', login);
module.exports = router;