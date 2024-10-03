const express = require("express");
const router = express.Router();
const axios = require("axios")
require('dotenv').config();

router.get("/lat-lng", (req, res) => {
    const {lat, lng} = req.body;
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather`,{params:
        {
            lat: lat,
            lon: lng,
            appid: process.env.WEATHER_API_KEY
        }
    } )
    .then((response) => {
      console.log(response.data);
      res.json(response.data)
    }).catch((error) => {
        console.error('Error fetching weather data:', error);
        res.status(500).json({error: 'Failed to fetch weather data'}); 
    });;
});

router.get("/geo-loc", (req, res) => {
    const { city, state, country, limit } = req.body; 
    let query = city ? city : '';  
    if (state) {
        query += `,${state}`;
    }
    if (country) {
        query += `,${country}`;
    }
    axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: query,  
            limit: limit || 5, 
            appid: process.env.WEATHER_API_KEY  
        }
    })
    .then((response) => {
        res.json(response.data);  
    })
    .catch((error) => {
        console.error('Error fetching location data:', error);
        res.status(500).json({ error: 'Failed to fetch location data' });  
    });
});

module.exports = router;