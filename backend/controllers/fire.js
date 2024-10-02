const express = require("express");
const router = express.Router();
const axios = require("axios")
require('dotenv').config();



router.get("/lat-lng", (req, res) => {
    const {lat, lng} = req.body;
    axios
    .get("https://api.ambeedata.com/fire/latest/by-lat-lng", {
        params: {lat: lat, lng: lng},
      headers: {
        'x-api-key': process.env.FIRE_API_KEY,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.json(response.data)
    });
});

module.exports = router;