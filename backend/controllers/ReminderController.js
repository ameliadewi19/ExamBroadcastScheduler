const cron = require('node-cron');
const wbm = require('wbm');
const db = require('../config/Database');
const Dosen = require("../models/DosenModel.js");
cron.schedule('*/5 * * * *', async () => {
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
        console.log('Messages sent successfully');
    } catch (error) {
        console.error(error);
    }
});