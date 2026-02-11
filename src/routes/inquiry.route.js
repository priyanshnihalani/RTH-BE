
const router = require("express").Router();
const controller = require("../controller/inquiry.controller");
const { create } = require("../repository/inquiry.repository");

router.post("/create", controller.create);

router.get("/getAll", controller.getAll);

router.put(
  "/status/:user_id",
  controller.updateStatus
);

router.put(
  "/approve/:user_id",
  controller.approve
);

router.put(
  "/notes/:user_id",
  controller.notes
);

module.exports = router;
