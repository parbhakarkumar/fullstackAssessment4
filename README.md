# QR Code Generator

A sleek QR code generator built with **Node.js**, **Express**, and the `qrcode` library.

## Features
- Generate QR codes from any text or URL
- Customize QR color and background color
- Adjust size (100px – 600px)
- Set error correction level (L / M / Q / H)
- Download as PNG

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open in browser
http://localhost:3000
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### `POST /api/generate`
Returns a base64 QR image.

**Body:**
```json
{
  "text": "https://example.com",
  "size": 300,
  "color": "#000000",
  "bgColor": "#ffffff",
  "errorLevel": "M"
}
```

**Response:**
```json
{
  "success": true,
  "qr": "data:image/png;base64,...",
  "text": "https://example.com"
}
```

---

### `POST /api/download`
Returns the QR code as a downloadable PNG file.

Same body as `/api/generate`. Returns a binary PNG stream.

## Tech Stack
- **Node.js** + **Express** — HTTP server
- **qrcode** — QR code generation# fullstackAssessment4
# fullstackAssessment4
# assesment4
# fullstackAssessment4
# fullstackAssessment4
# fullstackAssessment4
# fullstackAssessment4
# fullstackAssessment4
