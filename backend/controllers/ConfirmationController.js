const wbm = require('wbm');
const Dosen = require("../models/DosenModel.js"); // Sesuaikan dengan path yang benar

const sendConfirmation = async (req, res) => {
    try {
        await wbm.start({ showBrowser: true });

        const dosens = await Dosen.findAll();

        const contacts = dosens.map(dosen => ({
            phone: dosen.no_whatsapp,
            name: dosen.nama,
        }));

        const message = 'Hi {{name}}';

        for (const contact of contacts) {
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

module.exports = {
    sendConfirmation
};
