const router = require("express").Router();
const controller = require("../controller/trainee.controller");

router.put("/update/:id", controller.updateTrainee);
router.get("/getAll", controller.getAll);
router.delete("/remove/:id", controller.remove);
// router.patch("/updateStatus/:id", controller.updateStatus)
module.exports = router;
