const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/auth/status", userController.checkStatus);
router.post("/auth/me", userController.me);
router.post('/createtrainer', userController.createTrainer)
router.get("/logout", userController.logout)

module.exports = router;