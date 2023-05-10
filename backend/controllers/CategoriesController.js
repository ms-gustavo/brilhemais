const Category = require("../models/Category");

// helpers
const getToken = require("../helpers/GetToken");
const getAdminByToken = require("../helpers/GetAdminByToken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class CategoriesController {
  static async create(req, res) {
    const name = req.body.name;
    const image = req.file.filename;

    // validations
    if (!name) {
      res.status(422).json({
        message: `O nome é obrigatório`,
      });
      return;
    }
    if (!image) {
      res.status(422).json({
        message: `A imagem é obrigatória`,
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
        message: `Categoria criada com sucesso!`,
        newCategory,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
};
