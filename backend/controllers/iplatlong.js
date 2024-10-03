const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
    if (req.ip === "127.0.0.1" || req.ip === "::1" || req.ip === "::ffff:127.0.0.1") {
        console.log("Got local IP, trying to get public IP");
        axios.get("https://api.ipify.org?format=json").then( (result) => {
            console.log(`Got public IP ${result.data.ip}, trying to get location`);
            axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_IO_API_KEY}&ip=${result.data.ip}`).then( (result) => {
                console.log(`Got location: ${result.data.latitude}, ${result.data.longitude}`);
                res.json({
                    lat: Number(result.data.latitude),
                    long: Number(result.data.longitude)
                });
            });
        });
    } else {
        console.log(`Got public IP ${req.ip}, trying to get location`);
        axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_IO_API_KEY}&ip=${req.ip}`).then( (result) => {
            console.log(`Got location: ${result.data.latitude}, ${result.data.longitude}`);
            res.json({
                lat: Number(result.data.latitude),
                long: Number(result.data.longitude)
            });
        });
    }
});

module.exports = router;