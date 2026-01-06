const express = require("express");
const router = express.Router();
const controller = require("../controller/predocProgress.controller");

router.post("/upsert", controller.upsertProgress);
router.post("/userprogress", controller.getUserProgress);

module.exports = router;
