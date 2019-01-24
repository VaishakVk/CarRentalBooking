const express = require("express");
const path = require("path");

const router = express.Router();
const offerController = require(path.join(__dirname, "../", "controller","offer.js"))

router.get("/offers", offerController.getOffer)
router.get("/offers/addOffer", offerController.getAddOffer)
router.post("/offers/addOffer", offerController.postAddOffer)
router.get("/offers/:offerId", offerController.getOfferDetail)
module.exports = router;