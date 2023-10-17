const wbm = require("wbm");
const qr = require("qrcode");
const path = require("path");
const puppeteer = require('puppeteer');
const chromiumPath = require('@sparticuz/chromium').path;

const generateUniqueToken = async () => {
  try {
    //const browser = await puppeteer.launch({
      //headless: true, // Set headless to true for non-GUI environments
      //args: ['--no-sandbox', '--disable-setuid-sandbox'] // These options are often necessary in Docker environments
    //});

    //const page = await browser.newPage();
    

    const browser = await puppeteer.launch({
      headless: true,
      //args: ["--no-sandbox", "--disable-setuid-sandbox"],
      args: ["--disable-setuid-sandbox"],
      executablePath: chromiumPath,
    });
    
    const qrCodeData = await wbm.start({
      showBrowser: false,
      qrCodeData: true,
      session: true,
      browser: browser, // Pass the Puppeteer page to wbm
    });

    const qrCodePath = path.join(
      __dirname,
      "../../frontend/public/qrcodes",
      `qrcode.png`
    );

    try {
      await qr.toFile(qrCodePath, qrCodeData);
      console.log("QR code saved successfully");
    } catch (err) {
      console.error("Error generating QR code:", err);
    }

    // Rest of your code...

    await wbm.waitQRCode();
    await new Promise((resolve) => setTimeout(resolve, 30000));
    await wbm.end();

    console.log(qrCodeData);

    await browser.close(); // Close the Puppeteer browser

    return qrCodeData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const generateQRCode = async (req, res) => {
  try {
    const qrData = await generateUniqueToken();
    // const qrCodeDataURL = wbm.generateQRCodeDataUrl(uniqueToken);

    if (qrData != null) {
      res
        .status(200)
        .json({ qrData: qrData, message: "Success Generate QR Code" });
    }
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateQRCode,
};
