const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3012;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.options('*', (req, res) => {
  res.sendStatus(204);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Generate QR code as base64 PNG
app.post('/api/generate', async (req, res) => {
  const { text, size = 300, color = '#000000', bgColor = '#ffffff', errorLevel = 'M' } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text or URL is required' });
  }

  try {
    const qrDataURL = await QRCode.toDataURL(text.trim(), {
      width: parseInt(size),
      color: {
        dark: color,
        light: bgColor,
      },
      errorCorrectionLevel: errorLevel,
      margin: 2,
    });

    res.json({ success: true, qr: qrDataURL, text: text.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code', details: err.message });
  }
});

// Download QR as PNG
app.post('/api/download', async (req, res) => {
  const { text, size = 300, color = '#000000', bgColor = '#ffffff', errorLevel = 'M' } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text or URL is required' });
  }

  try {
    const buffer = await QRCode.toBuffer(text.trim(), {
      width: parseInt(size),
      color: {
        dark: color,
        light: bgColor,
      },
      errorCorrectionLevel: errorLevel,
      margin: 2,
    });

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="qrcode.png"',
    });
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ QR Code Generator running at http://localhost:${PORT}`);
});