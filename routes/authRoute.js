const express = require("express");
const path = require("path");

const router = express.Router();
const authController = require(path.join(__dirname, "../", "controller","auth.js"));

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);

module.exports = router;