const express = require("express");
const path = require("path");

const router = express.Router();
const modelController = require(path.join(__dirname, "../", "controller","car.js"));

router.get('/models', modelController.getModels);

module.exports = router;