// simulate.js
// backend/simulate.js
const axios = require('axios');

let lat = 23.2599;
let lon = 77.4126;

setInterval(() => {
  lat += (Math.random() - 0.5) * 0.001;
  lon += (Math.random() - 0.5) * 0.001;

  axios.post('http://localhost:5000/location', {
    deviceId: 'animal123',
    latitude: lat,
    longitude: lon,
  }, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(() => console.log(`📤 Sent location: ${lat}, ${lon}`))
  .catch((err) =>
    console.error(`❌ Error: ${err.response?.status} - ${err.response?.data?.error || err.message}`)
  );
}, 5000);
