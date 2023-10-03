const wbm = require('wbm');
const qr = require('qrcode');
const path = require('path');

const generateUniqueToken = async () => {
    try {
        const qrCodeData = await wbm.start({showBrowser: true, qrCodeData: true, session: true});
        const qrCodePath = path.join(__dirname, '../../frontend/public/qrcodes', `qrcode.png`);
        qr.toFile(qrCodePath, qrCodeData, (err) => {
            if (err) {
                console.error('Error generating QR code:', err);
            } 
        });
        await wbm.waitQRCode();

        await new Promise(resolve => setTimeout(resolve, 30000));   

        await wbm.end();

        console.log(qrCodeData);
        return qrCodeData;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const generateQRCode = async (req, res) => {
    try {
        const uniqueToken = await generateUniqueToken();
        // const qrCodeDataURL = wbm.generateQRCodeDataUrl(uniqueToken);

        const qrCodePath = path.join(__dirname, '../../frontend/public/qrcodes', `qrcode.png`);

        // Generate QR code from the uniqueToken
        qr.toFile(qrCodePath, uniqueToken, (err) => {
            if (err) {
                console.error('Error generating QR code:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Return the uniqueToken and path to the generated QR code
                res.json({ uniqueToken, qrCodePath });
            }
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  generateQRCode,
};
