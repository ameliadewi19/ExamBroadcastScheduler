const express= require("express");
const {verifyToken} = require("../middleware/VerifyToken.js");

const {
    getDosen, 
    getDosenById,
    createDosen,
    updateDosen,
    deleteDosen
} = require("../controllers/DosenController.js");

const router = express.Router();

router.get('/dosen', verifyToken,getDosen);
router.get('/dosen/:id', getDosenById);
router.post('/dosen', createDosen);
router.patch('/dosen/:id', updateDosen);
router.delete('/dosen/:id', deleteDosen);

module.exports = router;