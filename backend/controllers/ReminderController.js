const cron = require('node-cron');
const wbm = require('wbm');
const axios = require('axios');
const { format } = require('date-fns');
const HistoryReminder = require('../models/HistoryReminderModel.js');

const MAX_MESSAGES_PER_INTERVAL = 10;
const MINUTE_INTERVAL = 10; // 10 minutes in minutes

//Task send H-1
cron.schedule('0 17 * * *', async () => {
    try {
        const response = await axios.get('http://localhost:5000/jadwal-ujian'); // Replace with your API endpoint URL
        const datas = response.data;

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);

        const filteredDatas = datas.filter(data => {
            const recordDate = new Date(data.tanggal_ujian);
            return (
                recordDate.getFullYear() === currentDate.getFullYear() &&
                recordDate.getMonth() === currentDate.getMonth() &&
                recordDate.getDate() === currentDate.getDate()
            );
        });

        const contacts = filteredDatas.map(data => ({
            phone: data.no_whatsapp_dosen_pengawas,
            name: data.nama_dosen_pengawas,
            tanggal: data.tanggal_ujian,
            waktu_mulai: data.waktu_mulai,
            waktu_selesai: data.waktu_selesai,
            nama_matakuliah: data.nama_matakuliah,
            jenis_matakuliah: data.jenis_matakuliah,
            kelas: data.kelas,
            ruangan: data.ruangan,
        }));

        const groupedContacts = {};
        contacts.forEach(contact => {
            if (!groupedContacts[contact.phone]) {
                groupedContacts[contact.phone] = contact;
            }
        });
        
        const uniqueContacts = Object.values(groupedContacts);

        await wbm.start({ showBrowser: true });

        let contactCounter = 0;

        const sendNextContact = async () => {
            if (contactCounter < uniqueContacts.length) {
                const contact = uniqueContacts[contactCounter];
                const parsedDate = new Date(contact.tanggal);
                const formatedTgl = format(parsedDate, 'EEEE, d MMMM yyyy', { locale: require('date-fns/locale/id') });
                
                const reminders = [];
                for (const data of filteredDatas) {
                    if (data.no_whatsapp_dosen_pengawas === contact.phone) {
                        const reminderMessage = `${formatedTgl} pukul ${data.waktu_mulai} - ${data.waktu_selesai} untuk mata kuliah ${data.nama_matakuliah} ${data.jenis_matakuliah} kelas ${data.kelas} di ruangan ${data.ruangan}.`;
                        reminders.push(reminderMessage);
                    }
                }

                if (reminders.length > 0) {
                    // Join the reminders into a single message
                    const message = `Halo Bapak/Ibu ${contact.name}, mengingatkan jadwal mengawas besok :\n\n${reminders.join('\n\n')}`;
                    let status = '';
                    try {
                        await wbm.send([contact], message);

                        // Jika pengiriman pesan berhasil, set status ke "Sent"
                        status = "Sent";
                    } catch (error) {
                        console.error(error);
        
                        // Jika pengiriman pesan gagal, set status ke "Failed"
                        status = "Failed";
                    }
                    const now = new Date();
                    const localTimestamp = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })); // Konversi ke zona waktu lokal
                    const utcTimestamp = new Date(localTimestamp.getTime() - (localTimestamp.getTimezoneOffset() * 60000)); // Konversi ke zona waktu UTC
                    const formattedLocalTimestamp = localTimestamp.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
                    const historyRecord = {
                        nama: contact.name,
                        phone: contact.phone,
                        status: status,
                        timestamp: utcTimestamp.toISOString(),
                        jenis_reminder: "H-1"
                    };
                    await HistoryReminder.create(historyRecord);
                    const timeoutMillis = 10000;
                    await new Promise(resolve => setTimeout(resolve, timeoutMillis));
                }
                contactCounter++;
        
                if (contactCounter < contacts.length && contactCounter % MAX_MESSAGES_PER_INTERVAL === 0) {
                    // Pause for 10 minutes before sending the next batch of messages
                    setTimeout(sendNextContact, MINUTE_INTERVAL * 60 * 1000);
                } else {
                    // Send the next contact immediately
                    sendNextContact();
                }
            } else {
                await wbm.end();
            }
        };
        sendNextContact();
    } catch (error) {
        console.error(error);
    }
});

//Task send D-Day
cron.schedule('0 5 * * *', async () => {
    try {
        const response = await axios.get('http://localhost:5000/jadwal-ujian'); // Replace with your API endpoint URL
        const datas = response.data;
        const currentDate = new Date();

        const filteredDatas = datas.filter(data => {
            const recordDate = new Date(data.tanggal_ujian);
            return (
                recordDate.getFullYear() === currentDate.getFullYear() &&
                recordDate.getMonth() === currentDate.getMonth() &&
                recordDate.getDate() === currentDate.getDate()
            );
        });
        const contacts = filteredDatas.map(data => ({
            phone: data.no_whatsapp_dosen_pengawas,
            name: data.nama_dosen_pengawas,
            tanggal: data.tanggal_ujian,
            waktu_mulai: data.waktu_mulai,
            waktu_selesai: data.waktu_selesai,
            nama_matakuliah: data.nama_matakuliah,
            jenis_matakuliah: data.jenis_matakuliah,
            kelas: data.kelas,
            ruangan: data.ruangan,
        }));

        const groupedContacts = {};
        contacts.forEach(contact => {
            if (!groupedContacts[contact.phone]) {
                groupedContacts[contact.phone] = contact;
            }
        });
        
        const uniqueContacts = Object.values(groupedContacts);

        await wbm.start({ showBrowser: true });

        let contactCounter = 0;

        const sendNextContact = async () => {
            if (contactCounter < uniqueContacts.length) {
                const contact = uniqueContacts[contactCounter];
                const parsedDate = new Date(contact.tanggal);
                const formatedTgl = format(parsedDate, 'EEEE, d MMMM yyyy', { locale: require('date-fns/locale/id') });
                
                const reminders = [];
                for (const data of filteredDatas) {
                    if (data.no_whatsapp_dosen_pengawas === contact.phone) {
                        const reminderMessage = `${formatedTgl} pukul ${data.waktu_mulai} - ${data.waktu_selesai} untuk mata kuliah ${data.nama_matakuliah} ${data.jenis_matakuliah} kelas ${data.kelas} di ruangan ${data.ruangan}.`;
                        reminders.push(reminderMessage);
                    }
                }

                if (reminders.length > 0) {
                    // Join the reminders into a single message
                    const message = `Halo Bapak/Ibu ${contact.name}, mengingatkan jadwal mengawas hari ini :\n\n${reminders.join('\n\n')}`;
                    let status = '';
                    try {
                        await wbm.send([contact], message);

                        // Jika pengiriman pesan berhasil, set status ke "Sent"
                        status = "Sent";
                    } catch (error) {
                        console.error(error);
        
                        // Jika pengiriman pesan gagal, set status ke "Failed"
                        status = "Failed";
                    }
                    const now = new Date();
                    const localTimestamp = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })); // Konversi ke zona waktu lokal
                    const utcTimestamp = new Date(localTimestamp.getTime() - (localTimestamp.getTimezoneOffset() * 60000)); // Konversi ke zona waktu UTC
                    const formattedLocalTimestamp = localTimestamp.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
                    const historyRecord = {
                        nama: contact.name,
                        phone: contact.phone,
                        status: status,
                        timestamp: utcTimestamp.toISOString(),
                        jenis_reminder: "D-Day"
                    };
                    await HistoryReminder.create(historyRecord);
                    const timeoutMillis = 15000;
                    await new Promise(resolve => setTimeout(resolve, timeoutMillis));
                }
                contactCounter++;
        
                if (contactCounter < contacts.length && contactCounter % MAX_MESSAGES_PER_INTERVAL === 0) {
                    // Pause for 10 minutes before sending the next batch of messages
                    setTimeout(sendNextContact, MINUTE_INTERVAL * 60 * 1000);
                } else {
                    // Send the next contact immediately
                    sendNextContact();
                }
            } else {
                await wbm.end();
            }
        };
        sendNextContact();
    } catch (error) {
        console.error(error);
    }
});

const getHistory = async (req, res) => {
    try {
        const histories = await HistoryReminder.findAll();
        res.status(200).json(histories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getHistory,
};