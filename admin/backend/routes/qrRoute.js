// backend/routes/qrRoute.js
const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.get('/generate-qr/:vendorId', async (req, res) => {
  const { vendorId } = req.params;

  // Replace with your customer URL format
  const customerURL = `https://quickserve.site/vendor/${vendorId}`;


  try {
    const qrImage = await QRCode.toDataURL(customerURL);
    res.json({ qr: qrImage, url: customerURL });
  } catch (err) {
    res.status(500).json({ error: 'QR generation failed' });
  }
});

module.exports = router;
