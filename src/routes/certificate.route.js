const router = require("express").Router();
const CertificateController = require("../controller/certificate.controller");

router.post("/create", CertificateController.create);

router.get("/verify/:certificateId", CertificateController.verify);

module.exports = router;
