const express = require("express");
const router = express.Router();
const controller =
  require("../controller/preboardProgress.controller");

router.post("/video-progress", controller.saveVideoProgress);

router.post("/video-progress/all", controller.getAllProgress);

router.post("/video-progress/module", controller.getModuleProgress);

module.exports = router;
