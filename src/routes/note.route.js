const router = require("express").Router();
const controller = require("../controller/note.controller");

router.post("/create", controller.create);
router.get("/getAll", controller.getAll);
router.put("/update/:id", controller.update);
router.delete("/remove/:id", controller.remove);

module.exports = router;
