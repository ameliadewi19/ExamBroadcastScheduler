const cron = require('node-cron');
const wbm = require('wbm');
const db = require('../config/Database');

cron.schedule('0 13 * * *', () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Tambahkan satu hari ke tanggal saat ini

    // Query SQL untuk mengambil data dari tabel jadwalujian dan tabel dosen dengan JOIN
    const sqlQuery = `
        SELECT j.*, d.*
        FROM jadwalujian j
        INNER JOIN dosen d ON j.id_dosen = d.id
        WHERE j.tanggal_ujian = ?`;

    db.query(sqlQuery, [currentDate], (err, results) => {
        if (err) {
            console.error(err);
            return;
        }

        if (results.length === 0) {
            console.log('Tidak ada data yang sesuai dengan kriteria');
            return;
        }

        wbm.start({ showBrowser: true }).then(async () => {
            const contacts = results.map(result => ({
                phone: result.no_whatsapp,
                name: result.nama,
                tanggal_ujian: result.tanggal_ujian,
                waktu_mulai: result.waktu_mulai,
                waktu_selesai: result.waktu_selesai
            }));

            const message = 'Hi {{name}}, your age is {{age}}. This message is sent every day at 17:00 one day before the specified date.';

            for (const contact of contacts) {
                await wbm.send([contact], message);
                const timeoutMillis = 5000; // Sesuaikan durasi timeout sesuai kebutuhan (dalam milidetik)
                await new Promise(resolve => setTimeout(resolve, timeoutMillis));
            }

            await wbm.end();
        }).catch(err => console.log(err));
    });
});