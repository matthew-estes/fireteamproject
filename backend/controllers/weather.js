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

module.exports = router;