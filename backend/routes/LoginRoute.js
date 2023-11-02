const express = require("express");
const { getAdmin,login, logout} = require("../controllers/LoginController.js");
const {verifyToken} = require("../middleware/VerifyToken.js");
const {refreshToken} = require("../controllers/RefreshToken.js");

const router = express.Router(); // Definisikan objek router terlebih dahulu

router.get('/admin', getAdmin); // Kemudian tambahkan rute ke dalam objek router
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);


module.exports = router; // Export objek router
