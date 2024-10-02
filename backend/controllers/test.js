const express = require("express");
const router = express.Router();

const models = require("../models");
    const testModel = models.Test;

router.get("/", (req, res) => {
    testModel.findOne({}).then( (test) => {
        res.send(test.testKey);
    });
});

module.exports = router;