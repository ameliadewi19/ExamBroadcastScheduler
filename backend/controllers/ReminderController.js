const cron = require('node-cron');
const wbm = require('wbm');
const axios = require('axios');
const { format } = require('date-fns');

const MAX_MESSAGES_PER_INTERVAL = 10;
const MINUTE_INTERVAL = 10; // 10 minutes in minutes

//Task send H-1
cron.schedule('0 12 * * *', async () => {
    try {
        const response = await axios.get('http://localhost:5000/jadwal-ujian'); // Replace with your API endpoint URL
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

        await wbm.start({ showBrowser: true });

        let contactCounter = 0;

        const sendNextContact = async () => {
            if (contactCounter < contacts.length) {
                const contact = contacts[contactCounter];
      
              // Your existing code here to send WhatsApp message
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);
                // Format currentDate as "YYYY-MM-DD"
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with '0' if needed
                const day = String(currentDate.getDate()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day}`;

                if(formattedDate === contact.tanggal){
                    const parsedDate = new Date(contact.tanggal);
                    const formatedTgl = format(parsedDate, 'EEEE, d MMMM yyyy', { locale: require('date-fns/locale/id') });
                    
                    const message = `Halo {{name}}, jadwal ujian kamu besok, ${formatedTgl} pukul {{waktu_mulai}} - {{waktu_selesai}} untuk mata kuliah {{nama_matakuliah}} {{jenis_matakuliah}} kelas {{kelas}} di ruangan {{ruangan}}.`;
                    await wbm.send([contact], message);
                    const timeoutMillis = 15000; // Sesuaikan durasi timeout sesuai kebutuhan (dalam milidetik)
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
cron.schedule('16 10 * * *', async () => {
    try {
        const response = await axios.get('http://localhost:5000/jadwal-ujian'); // Replace with your API endpoint URL
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

        await wbm.start({ showBrowser: true });

        let contactCounter = 0;

        const sendNextContact = async () => {
            if (contactCounter < contacts.length) {
                const contact = contacts[contactCounter];
      
              // Your existing code here to send WhatsApp message
                const currentDate = new Date();
                // Format currentDate as "YYYY-MM-DD"
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with '0' if needed
                const day = String(currentDate.getDate()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day}`;

                if(formattedDate === contact.tanggal){
                    const parsedDate = new Date(contact.tanggal);
                    const formatedTgl = format(parsedDate, 'EEEE, d MMMM yyyy', { locale: require('date-fns/locale/id') });
                    
                    const message = `Halo {{name}}, jadwal ujian kamu hari ini, ${formatedTgl} pukul {{waktu_mulai}} - {{waktu_selesai}} untuk mata kuliah {{nama_matakuliah}} {{jenis_matakuliah}} kelas {{kelas}} di ruangan {{ruangan}}.`;
                    await wbm.send([contact], message);
                    const timeoutMillis = 10000; // Sesuaikan durasi timeout sesuai kebutuhan (dalam milidetik)
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