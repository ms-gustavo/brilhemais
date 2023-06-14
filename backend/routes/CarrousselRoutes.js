const router = require("express").Router();
const CarrousselController = require("../controllers/CarrousselController");

const verifyToken = require("../helpers/VerifyToken");
const { imageUpload } = require("../helpers/ImageUpload");

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  CarrousselController.create
);
router.get("/", CarrousselController.getAll);
router.get("/:id", CarrousselController.getCarrousselById);
router.delete("/:id", CarrousselController.deleteCarrousselById);

module.exports = router;
