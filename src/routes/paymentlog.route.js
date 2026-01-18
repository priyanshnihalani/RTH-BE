const express = require("express");
const router = express.Router();
const controller = require("../controller/paymentLog.controller");

router.post("/create", controller.create);
router.get("/getTraineePaymentId/:batchTraineeId", controller.getByBatchTrainee);
router.get('/findAllPaymentLogs', controller.findAllPaymentLogs)
router.delete("/:id", controller.remove);

module.exports = router;