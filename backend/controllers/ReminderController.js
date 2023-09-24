const cron = require('node-cron');
const wbm = require('wbm');
const db = require('../config/Database');

const sendReminder = async (req, res) => {
    try {
        cron.schedule('57 12 * * *', () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1); // Tambahkan satu hari ke tanggal saat ini
        
            // Query SQL untuk mengambil data dari tabel jadwalujian dan tabel dosen dengan JOIN
            const sqlQuery = `
                SELECT j.*, d.*
                FROM "JadwalUjian" as j
                INNER JOIN "Dosen" as d ON j.id_dosen = d.id_dosen
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
        
                console.log('Data yang ditemukan:', results);
        
                wbm.start({ showBrowser: true }).then(async () => {
                    const contacts = results.map(result => ({
                        phone: result.no_whatsapp,
                        name: result.nama,
                        tanggal_ujian: result.tanggal_ujian,
                        waktu_mulai: result.waktu_mulai,
                        waktu_selesai: result.waktu_selesai,
                        nama_matakuliah: result.nama_matakuliah,
                        ruangan: result.ruangan
                    }));
        
                    const message = `Hi {{name}}, reminder mengawas ujian mata kuliah {{nama_matakuliah}}
                                    tanggal {{tanggal_ujian}} pukul {{waktu_mulai}} - {{waktu_selesai}}, di ruangan {{ruangan}}.`;
        
                    for (const contact of contacts) {
                        await wbm.send([contact], message);
                        const timeoutMillis = 5000; // Sesuaikan durasi timeout sesuai kebutuhan (dalam milidetik)
                        await new Promise(resolve => setTimeout(resolve, timeoutMillis));
                    }
        
                    await wbm.end();
                    res.status(200).json({ msg: 'Reminder sent' });
                }).catch(err => console.log(err));
            });
        });
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { sendReminder };