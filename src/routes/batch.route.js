const router = require("express").Router()
const controller = require("../controller/batch.controller")

router.post("/create", controller.create);
router.get("/getallbatchwithdetail", controller.findAll)
router.get("/getbatchwithdetail/:id", controller.findOne)
router.put("/updateBatch/:id", controller.update)
router.delete("/deleteBatch/:id", controller.remove)

module.exports = router