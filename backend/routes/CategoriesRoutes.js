const router = require("express").Router();
const CategoriesController = require("../controllers/CategoriesController");

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

module.exports = router;
