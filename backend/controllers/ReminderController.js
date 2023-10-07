const cron = require('node-cron');
const wbm = require('wbm');
const axios = require('axios');
const { format } = require('date-fns');
const Reminder = require('../models/ReminderModel.js');
const HistoryReminder = require('../models/HistoryReminderModel.js');

const MAX_MESSAGES_PER_INTERVAL = 10;
const MINUTE_INTERVAL = 10; // 10 minutes in minutes

//Task send H-1
cron.schedule('41 21 * * *', async () => {
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

        const template = await Reminder.findByPk(1);

        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }

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
                        const reminderMessage = template.message
                            .replace('{nama}', contact.name)
                            .replace('{tanggal}', formatedTgl)
                            .replace('{waktu_mulai}', data.waktu_mulai)
                            .replace('{waktu_selesai}', data.waktu_selesai)
                            .replace('{nama_matakuliah}', data.nama_matakuliah)
                            .replace('{jenis_matakuliah}', data.jenis_matakuliah)
                            .replace('{kelas}', data.kelas)
                            .replace('{ruangan}', data.ruangan);
                        reminders.push(reminderMessage);
                    }
                }

                if (reminders.length > 0) {
                    // Join the reminders into a single message
                    const message = `${template.pembuka.replace('{nama}', contact.name)}\n\n${reminders.join('\n\n')}`;
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

//Task send D-Day
cron.schedule('48 21 * * *', async () => {
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

        const template = await Reminder.findByPk(2);

        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }

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
                        const reminderMessage = template.message
                            .replace('{nama}', contact.name)
                            .replace('{tanggal}', formatedTgl)
                            .replace('{waktu_mulai}', data.waktu_mulai)
                            .replace('{waktu_selesai}', data.waktu_selesai)
                            .replace('{nama_matakuliah}', data.nama_matakuliah)
                            .replace('{jenis_matakuliah}', data.jenis_matakuliah)
                            .replace('{kelas}', data.kelas)
                            .replace('{ruangan}', data.ruangan);
                        reminders.push(reminderMessage);
                    }
                }

                if (reminders.length > 0) {
                    // Join the reminders into a single message
                    const message = `${template.pembuka.replace('{nama}', contact.name)}\n\n${reminders.join('\n\n')}`;
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

async function getReminders(req, res, next) {
    try {
        const reminders = await Reminder.findAll();
        req.reminders = reminders;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getReminderById = async (req, res) => {
    const { id } = req.params;
    try {
        const reminder = await Reminder.findByPk(id);
        if (!reminder) {
            res.status(404).json({ message: 'Reminder Template not found' });
        } else {
            res.status(200).json(reminder);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getHistory(req, res, next){
    try {
        const histories = await HistoryReminder.findAll();
        req.histories = histories;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function sendDataToClient(req, res) {
    const reminders = req.reminders;
    const histories = req.histories;
  
    // Send both sets of data as a JSON response to the client
    res.json({ reminders, histories });
}

const updateReminder = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Reminder.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedReminder = await Reminder.findByPk(id);
            res.status(200).json(updatedReminder);
        } else {
            res.status(404).json({ message: 'Reminder Template not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getReminders,
    getReminderById,
    getHistory,
    sendDataToClient,
    updateReminder
};