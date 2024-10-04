const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/lat-lng', (req, res) => {
  const { lat, lng } = req.query;
  axios
    .get('https://api.ambeedata.com/fire/latest/by-lat-lng', {
      params: { lat: lat, lng: lng },
      headers: {
        'x-api-key': process.env.FIRE_API_KEY,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error('Error fetching fire/latest/by-lat-lng:', error);
      res.status(500).json({ error: 'Failed to fetch fire data' });
    });
});

router.get('/place', (req, res) => {
  const { state } = req.body;
  axios
    .get('https://api.ambeedata.com/fire/latest/by-place', {
      params: { place: state },
      headers: {
        'x-api-key': process.env.FIRE_API_KEY,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error('Error fetching fire/latest/by-place:', error);
      res.status(500).json({ error: 'Failed to fetch fire data' });
    });
});

router.get('/fire-alerts', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const intervalId = setInterval(async () => {
    try {
      // Make the API call to get fire data
      // const fireData = await axios.get('https://api.ambeedata.com/fire/latest/by-lat-lng', {
      //   params: { lat: req.query.lat, lng: req.query.lng },
      //   headers: { 'x-api-key': process.env.FIRE_API_KEY },
      // });
      const fireData = {
        lat: 40.47943,
        lng: -74.32321,
        detectedAt: '2024-10-04T07:39:00.000Z',
        confidence: 'nominal',
        frp: 0.45,
        fwi: 5.272500038146973,
        fireType: 'detected',
        fireCategory: 'N',
      };

      // Send the fire data as an event
      res.json(fireData.data);
    } catch (error) {
      console.error('Error fetching fire data:', error);
      res.write(
        `data: ${JSON.stringify({ error: 'Error fetching fire data' })}\n\n`
      );
    }
  }, 5 * 60 * 1000); // 5 minutes interval

  req.on('close', () => {
    clearInterval(intervalId); // Clear interval when connection closes
  });
});

module.exports = router;
