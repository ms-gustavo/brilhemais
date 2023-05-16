const router = require("express").Router();
const CategoriesController = require("../controllers/CategoriesController");
const AccessoryController = require("../controllers/AccessoryController");

//middlewares
const verifyToken = require("../helpers/VerifyToken");
const { imageUpload } = require("../helpers/ImageUpload");

router.post(
  "/create",
  verifyToken,
  imageUpload.single("image"),
  CategoriesController.create
);
router.get("/", CategoriesController.getAll);
router.get("/:id", CategoriesController.getCategoryById);
router.delete("/:id", CategoriesController.deleteCategoryById);
router.get("/:id/accessories", AccessoryController.getAccessoryByCategory);

module.exports = router;
