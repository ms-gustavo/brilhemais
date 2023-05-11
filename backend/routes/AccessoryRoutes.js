const router = require("express").Router();
const AccessoryController = require("../controllers/AccessoryController");

// middlewares
const verifyToken = require("../helpers/VerifyToken");
const { imageUpload } = require("../helpers/ImageUpload");

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  AccessoryController.create
);

module.exports = router;
