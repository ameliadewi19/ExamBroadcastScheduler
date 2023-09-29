const wbm = require('wbm');
const Dosen = require("../models/DosenModel.js"); // Sesuaikan dengan path yang benar
const JadwalUjian = require("../models/JadwalModel.js");
const axios = require('axios');
const Confirmation = require("../models/ConfirmationModel.js"); // Sesuaikan dengan path yang benar

const sendConfirmation = async (req, res) => {
    // test git
    try {
        await wbm.start({ showBrowser: true });

        const { id } = req.body;

        const template = await Confirmation.findByPk(id);

        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }

        const response = await axios.get('http://localhost:5000/jadwal-ujian'); // Replace with your API endpoint URL
        const jadwals = response.data;

        const contacts = jadwals.map(jadwal => ({
            phone: jadwal.no_whatsapp_dosen_pengawas,
            name: jadwal.nama_dosen_pengawas,
            matkul: jadwal.nama_matakuliah,
            tanggal: jadwal.tanggal_ujian,
            kelas: jadwal.kelas,
            waktu_mulai: jadwal.waktu_mulai,
            waktu_selesai: jadwal.waktu_selesai,
            ruangan: jadwal.ruangan
        }));

        for (const contact of contacts) {
            const message = template.message
                .replace('{{name}}', contact.name)
                .replace('{{tanggal}}', contact.tanggal)
                .replace('{{matkul}}', contact.matkul)
                .replace('{{kelas}}', contact.kelas)
                .replace('{{waktu_mulai}}', contact.waktu_mulai)
                .replace('{{waktu_selesai}}', contact.waktu_selesai)
                .replace('{{ruangan}}', contact.ruangan);

            await wbm.send([contact], message);
            const timeoutMillis = 5000; // Sesuaikan durasi timeout sesuai kebutuhan (dalam milidetik)
            await new Promise(resolve => setTimeout(resolve, timeoutMillis));
        }

        await wbm.end();
        res.status(200).json({ message: 'Messages sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createConfirmation = async (req, res) => {
    try {
        const { message, status } = req.body;
        const confirmation = await Confirmation.create({ message, status });
        res.status(201).json(confirmation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getConfirmation = async (req, res) => {
    try {
        const confirmations = await Confirmation.findAll();
        res.status(200).json(confirmations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getConfirmationById = async (req, res) => {
    const { id } = req.params;
    try {
        const confirmation = await Confirmation.findByPk(id);
        if (!confirmation) {
            res.status(404).json({ message: 'Confirmation not found' });
        } else {
            res.status(200).json(confirmation);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateConfirmation = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Confirmation.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedConfirmation = await Confirmation.findByPk(id);
            res.status(200).json(updatedConfirmation);
        } else {
            res.status(404).json({ message: 'Confirmation not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteConfirmation = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Confirmation.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Confirmation not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    sendConfirmation,
    createConfirmation,
    getConfirmation,
    getConfirmationById,
    updateConfirmation,
    deleteConfirmation
};