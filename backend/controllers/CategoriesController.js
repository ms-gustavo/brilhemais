const Category = require("../models/Category");
const Joi = require("joi");
// helpers
const getToken = require("../helpers/GetToken");
const getAdminByToken = require("../helpers/GetAdminByToken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class CategoriesController {
  static async create(req, res) {
    const name = req.body.name;
    const image = req.file ? req.file.filename : undefined;

    // validations
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": `O nome é obrigatório`,
      }),
      image: Joi.string().required().messages({
        "any.required": `A imagem é obrigatória`,
      }),
    });
    const { error, value } = schema.validate({
      name,
      image,
    });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(422).json({
        message: errorMessage,
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
};
