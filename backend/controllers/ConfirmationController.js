const wbm = require('wbm');
const Dosen = require("../models/DosenModel.js"); // Sesuaikan dengan path yang benar
const Confirmation = require("../models/ConfirmationModel.js"); // Sesuaikan dengan path yang benar

const sendConfirmation = async (req, res) => {
    try {
        await wbm.start({ showBrowser: true });

        const { id } = req.body;

        const template = await Confirmation.findByPk(id);

        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }

        const dosens = await Dosen.findAll();

        const contacts = dosens.map(dosen => ({
            phone: dosen.no_whatsapp,
            name: dosen.nama,
        }));

        for (const contact of contacts) {
            const message = template.message.replace('{{name}}', contact.name);

            await wbm.send([contact], message);
<<<<<<< HEAD
            const timeoutMillis = 5000; // Sesuaikan durasi timeout sesuai kebutuhan (dalam milidetik)
=======
            const timeoutMillis = 30000;
>>>>>>> 8d38b81816e5e5026085e33fb7256083ab70afbf
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