const express = require("express");
const router = express.Router();
const controller = require("../controller/task.controller");

router.post("/assign", controller.assignTask);
router.patch("/update/:id/rework", controller.sendBackForRework);
router.put("/updateTitleDescription", controller.updateTaskDescriptionTitle)
router.post("/mytasks", controller.getMyTasks);
router.put("/update/status", controller.updateTaskStatus);
router.post("/traineetask", controller.getTraineeTasks)

module.exports = router;