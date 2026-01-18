const router = require("express").Router();
const controller = require("../controller/trainee.controller");

router.put("/update/:id", controller.updateTrainee);
router.get("/getAll", controller.getAll);
router.get("/getAllTraineesPerBatch", controller.getAllTraineesPerBatch);
router.post("/getByMonth", controller.findAllTraineeByMonth);
router.post("/getByCollage", controller.findTraineeCountByCollage);
router.post("/getByTechnology", controller.findTraineeCountByTechnology);
router.delete("/remove/:id", controller.remove);
router.post("/pertraineetaskperbatch/", controller.getBatchTrainees);
router.post("/getTraineeById", controller.getTraineeById)

module.exports = router;