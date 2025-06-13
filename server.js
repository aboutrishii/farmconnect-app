// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

let fakeLocation = {
  deviceId: 'animal123',
  latitude: 23.2599,
  longitude: 77.4126,
  timestamp: new Date(),
};

app.use(cors());
app.use(bodyParser.json());

app.post('/location', (req, res) => {
  const { deviceId, latitude, longitude } = req.body;
  if (!deviceId || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  fakeLocation = { deviceId, latitude, longitude, timestamp: new Date() };
  console.log('✅ Location updated:', fakeLocation);
  res.json({ status: 'ok' });
});

app.get('/location/:deviceId', (req, res) => {
  if (req.params.deviceId === fakeLocation.deviceId) {
    res.json(fakeLocation);
  } else {
    res.status(404).json({ error: 'Device not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

