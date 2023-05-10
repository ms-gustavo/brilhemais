const router = require("express").Router();
const AdminController = require("../controllers/AdminController");

router.post("/login", AdminController.login);
router.get("/checkadmin", AdminController.checkAdmin);

module.exports = router;
