const express = require('express');
const path = require("path");

const homeController = require(path.join(__dirname, "../", "controller","home.js"));
const router = express.Router();

router.get('/', homeController.getHome);

router.post('/book', homeController.postBooking);

router.post('/checkout', homeController.getCheckout);

router.post('/coupon', homeController.postValdiateCoupon);

router.post('/confirm', homeController.postConfirm);

module.exports = router;
