const router = require("express").Router();
const controller = require("../controller/trainer.controller");

router.put("/update/:id", controller.update);
router.get("/getAll", controller.getAll);
router.delete("/remove/:id", controller.remove);
router.post("/assignBatch", controller.assignBatches)
router.get("/getTrainersBatches", controller.getTrainerBatches)
module.exports = router;
