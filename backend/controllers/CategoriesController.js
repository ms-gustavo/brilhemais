const Category = require("../models/Category");

const i18n = require("../helpers/i18n");
i18n.setLocale("br");
// helpers
const getToken = require("../helpers/GetToken");
const getUserByToken = require("../helpers/GetUserByToken");
const { validateCreateCategory } = require("../helpers/CategoriesValidations");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class CategoriesController {
  static async create(req, res) {
    //check if user is admin
    const token = getToken(req);
    console.log("create categorie", token);
    const user = await getUserByToken(token);
    console.log("user", user);
    console.log("user is admin", user.isAdmin);
    if (!user.isAdmin) {
      res.status(422).json({
        message: i18n.__("UNABLE_TO_PROCESS"),
      });
      return;
    }

    const name = req.body.name;
    const image = req.file ? req.file.filename : undefined;

    // validations
    const validationError = validateCreateCategory(name, image);
    if (validationError) {
      return res.status(422).json({
        message: validationError,
      });
    }

    // check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      res.status(422).json({
        message: i18n.__("CATEGORY_EXISTS"),
      });
      return;
    }

    const category = new Category({
      name,
      image,
    });

    try {
      const newCategory = await category.save();
      res.status(201).json({
        message: i18n.__("CATEGORY_SUCCESSFULLY_CREATED"),
        newCategory,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const categories = await Category.find()
        .sort("-createdAt")
        .populate("accessories");
      res.status(200).json({
        categories,
      });
    } catch (error) {
      res.status(500).json({
        message: i18n.__("CATEGORIES_ERROR_GET"),
      });
    }
  }

  static async getCategoryById(req, res) {
    const id = req.params.id;
    // check if ID is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: i18n.__("INVALID_ID"),
      });
      return;
    }

    // check if category exists
    const category = await Category.findOne({ _id: id });
    if (!category) {
      res.status(404).json({
        message: i18n.__("CATEGORY_NOT_FOUND"),
      });
      return;
    }

    res.status(200).json({
      category,
    });
  }

  static async deleteCategoryById(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user.isAdmin) {
      res.status(422).json({
        message: i18n.__("UNABLE_TO_PROCESS"),
      });
      return;
    }

    const id = req.params.id;
    // check if ID is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: i18n.__("INVALID_ID"),
      });
      return;
    }

    // check if category exists
    const category = await Category.findOne({ _id: id });
    if (!category) {
      res.status(404).json({
        message: i18n.__("CATEGORY_NOT_FOUND"),
      });
      return;
    }

    await Category.findByIdAndRemove(id);
    res.status(200).json({
      message: i18n.__("CATEGORIES_SUCCESSFULLY_REMOVED"),
    });
  }
};
