const wbm = require('wbm');
const axios = require('axios');
const Confirmation = require("../models/ConfirmationModel.js"); // Sesuaikan dengan path yang benar
const { format } = require('date-fns');

const MAX_MESSAGES_PER_INTERVAL = 10;
const MINUTE_INTERVAL = 10; 

const sendConfirmation = async (req, res) => {
    try {
        await wbm.start({ showBrowser: false });

        const { id } = req.body;

        const template = await Confirmation.findByPk(id);

        console.log(template);

        if (!template) {
            res.status(404).json({ message: 'Template not found' });
            return;
        }

        const response = await axios.get('http://194.233.93.124:5005/jadwal-ujian');
        const datas = response.data;

        const contacts = datas.map(data => ({
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

        console.log(groupedContacts);

        const uniqueContacts = Object.values(groupedContacts);
        
        console.log(uniqueContacts);

        let contactCounter = 0;

        const sendNextContact = async () => {
            if (contactCounter < uniqueContacts.length) {
                const contact = uniqueContacts[contactCounter];
		//console.log(contact.name);
                const parsedDate = new Date(contact.tanggal);
                const formattedTgl = format(parsedDate, 'EEEE, d MMMM yyyy', { locale: require('date-fns/locale/id') });

                const reminders = [];
                const seen = new Set(); // To keep track of which messages have been added

                for (const data of datas) {
                    if (data.no_whatsapp_dosen_pengawas === contact.phone) {
                        const messageKey = `${data.nama_dosen_pengawas}_${data.nama_matakuliah}_${data.tanggal_ujian}_${data.waktu_mulai}_${data.waktu_selesai}_${data.ruangan}`;
                        if (!seen.has(messageKey)) {
                            const message = template.message
                                .replace('{{tanggal}}', formattedTgl)
                                .replace('{{matkul}}', data.nama_matakuliah)
                                .replace('{{kelas}}', data.kelas)
                                .replace('{{waktu_mulai}}', data.waktu_mulai)
                                .replace('{{waktu_selesai}}', data.waktu_selesai)
                                .replace('{{ruangan}}', data.ruangan);

                            reminders.push(message);
                            seen.add(messageKey);
                        }
                    }
                }

                console.log(reminders);

                if (reminders.length > 0) {
                    const message = `${template.pembuka.replace('{{name}}', contact.name)}\n\n${reminders.join('\n\n')}`;
                    console.log(message);
		    console.log(contact.name);
                    await wbm.send([contact.phone], message); // wbm.send() expects an array of phone numbers
                    const timeoutMillis = 30000;
                    await new Promise(resolve => setTimeout(resolve, timeoutMillis));
                }


                contactCounter++;

                if (contactCounter < uniqueContacts.length && contactCounter % MAX_MESSAGES_PER_INTERVAL === 0) {
                    setTimeout(sendNextContact, MINUTE_INTERVAL * 60 * 1000);
                } else {
                    sendNextContact();
                }
            } else {
                await wbm.end();
            }
        };
        sendNextContact();

        // await wbm.end();
        res.status(200).json({ message: 'Messages sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const sendConfirmation = async (req, res) => {
//     try {
//         await wbm.start({ showBrowser: true });

//         const { id } = req.body;

//         const template = await Confirmation.findByPk(id);

//         if (!template) {
//             res.status(404).json({ message: 'Template not found' });
//             return;
//         }

//         const response = await axios.get('http://localhost:5000/jadwal-ujian'); // Replace with your API endpoint URL
//         const jadwals = response.data;

//         const contacts = jadwals.map(jadwal => ({
//             phone: jadwal.no_whatsapp_dosen_pengawas,
//             name: jadwal.nama_dosen_pengawas,
//             matkul: jadwal.nama_matakuliah,
//             tanggal: jadwal.tanggal_ujian,
//             kelas: jadwal.kelas,
//             waktu_mulai: jadwal.waktu_mulai,
//             waktu_selesai: jadwal.waktu_selesai,
//             ruangan: jadwal.ruangan
//         }));

//         for (const contact of contacts) {
//             const message = template.message
//                 .replace('{{name}}', contact.name)
//                 .replace('{{tanggal}}', contact.tanggal)
//                 .replace('{{matkul}}', contact.matkul)
//                 .replace('{{kelas}}', contact.kelas)
//                 .replace('{{waktu_mulai}}', contact.waktu_mulai)
//                 .replace('{{waktu_selesai}}', contact.waktu_selesai)
//                 .replace('{{ruangan}}', contact.ruangan);

//             await wbm.send([contact], message);
//             const timeoutMillis = 5000; // Sesuaikan durasi timeout sesuai kebutuhan (dalam milidetik)
//             await new Promise(resolve => setTimeout(resolve, timeoutMillis));
//         }

//         await wbm.end();
//         res.status(200).json({ message: 'Messages sent successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const createConfirmation = async (req, res) => {
    try {
        const { message, pembuka } = req.body;
        const confirmation = await Confirmation.create({ message, pembuka });
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
