const express = require('express');
const path = require('path');

const router = express.Router();
const errorController = require(path.join(__dirname, "../", "controller","error.js"))

router.get('/:pageNotFound', errorController.get404);

module.exports = router;