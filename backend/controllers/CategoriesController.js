const Category = require("../models/Category");
const Joi = require("joi");
// helpers
const getToken = require("../helpers/GetToken");
const getUserByToken = require("../helpers/GetUserByToken");
const { validateCreateCategory } = require("../helpers/CategoriesValidations");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class CategoriesController {
  static async create(req, res) {
    const name = req.body.name;
    const image = req.file ? req.file.filename : undefined;

    // validations
    const validationError = validateCreateCategory(name, image);
    if (validationError) {
      return res.status(422).json({
        message: validationError,
      });
    }

    const category = new Category({
      name,
      image,
    });

    try {
      const newCategory = await category.save();
      res.status(201).json({
        message: `Categoria criada com sucesso!`,
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
        message: `Ocorreu um erro ao obter as categorias.`,
      });
    }
  }

  static async getCategoryById(req, res) {
    const id = req.params.id;
    // check if ID is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: `ID Inválido`,
      });
      return;
    }

    // check if category exists
    const category = await Category.findOne({ _id: id });
    if (!category) {
      res.status(404).json({
        message: `A categoria não existe`,
      });
      return;
    }

    res.status(200).json({
      category,
    });
  }

  static async deleteCategoryById(req, res) {
    const id = req.params.id;
    // check if ID is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: `ID Inválido`,
      });
      return;
    }

    // check if category exists
    const category = await Category.findOne({ _id: id });
    if (!category) {
      res.status(404).json({
        message: `A categoria não existe`,
      });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user.isAdmin) {
      res.status(422).json({
        message: `Houve um problema em processar a sua solicitação! Tente novamente mais tarde.`,
      });
      return;
    }

    await Category.findByIdAndRemove(id);
    res.status(200).json({
      message: `Categoria excluída.`,
    });
  }
};
