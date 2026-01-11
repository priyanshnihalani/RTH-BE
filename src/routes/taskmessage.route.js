const express = require("express");
const router = express.Router();
const controller = require("../controller/taskmessage.controller");

router.post("/getTaskMessages", controller.getByTask);
router.post("/createTaskMessages", controller.create);

module.exports = router;
