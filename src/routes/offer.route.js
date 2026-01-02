const express = require("express")
const router = express.Router();
const controller = require("../controller/offer.controller")
router.post("/offer_letter_generation", controller.generateOfferLetter)

module.exports = router;
