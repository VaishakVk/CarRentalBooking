const express = require("express");
const path = require("path");

const router = express.Router();
const authController = require(path.join(__dirname, "../", "controller","auth.js"));

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);

router.get('/logout', authController.postLogout);
router.get('/forgotPassword', authController.getchangePassword);
router.post('/forgotPassword', authController.postchangePassword);

module.exports = router;