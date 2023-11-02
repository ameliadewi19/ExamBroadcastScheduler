const wbm = require("wbm");
const qr = require("qrcode");
const path = require("path");

const generateUniqueToken = async () => {
  try {
    const qrCodeData = await wbm.start({
      showBrowser: false,
      qrCodeData: true,
      session: true,
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

    await wbm.waitQRCode();

    // await new Promise((resolve) => setTimeout(resolve, 30000));

    await wbm.end();

    // console.log(qrCodePath);
    return qrCodePath;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const generateQRCode = async (req, res) => {
  try {
    const qrPath = await generateUniqueToken();
    // const qrCodeDataURL = wbm.generateQRCodeDataUrl(uniqueToken);

    if (qrPath != null) {
      res
        .status(200)
        .json({ qrPath: qrPath, message: "Success Generate QR Code" });
    }
    // const qrCodeData = await wbm.start({
    //   showBrowser: false,
    //   qrCodeData: true,
    //   session: true,
    // });
    
    // await wbm.waitQRCode();

    // await new Promise((resolve) => setTimeout(resolve, 30000));
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateQRCode,
};