const express= require("express");
const {verifyToken} = require("../middleware/VerifyToken.js");
const multer = require('multer'); 
const {
    getDosen, 
    getDosenById,
    createDosen,
    createBulkDosen,
    updateDosen,
    deleteDosen,
    downloadExcelTemplate
} = require("../controllers/DosenController.js");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage });

router.get('/dosen',getDosen);
router.get('/dosen/:id', getDosenById);
router.get('/dosen/download-template', downloadExcelTemplate)
router.post('/dosen-bulk', upload.single('excelFile'),createBulkDosen);
router.post('/dosen', createDosen);
router.patch('/dosen/:id', updateDosen);
router.delete('/dosen/:id', deleteDosen);

module.exports = router;