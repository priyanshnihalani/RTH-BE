const express = require("express")
const router = express.Router();
const controller = require("../controller/offer.controller")
router.post("/offer_letter_generation", controller.generateOfferLetter);
router.post("/certificate_generation", controller.generateCertificate);
router.post("/receipt_generation", controller.generateReceipt);
module.exports = router;
