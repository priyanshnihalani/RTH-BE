const express = require("express");
const router = express.Router();
const controller = require("../controller/task.controller");

router.post("/assign", controller.assignTask);
router.patch("/update/:id/rework", controller.sendBackForRework);

router.get("/mytasks", controller.getMyTasks);
router.patch("/update/:id/status", controller.updateTaskStatus);

module.exports = router;
