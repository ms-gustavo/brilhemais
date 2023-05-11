const Accessory = require("../models/Accessory");
const Category = require("../models/Category");

//helpers
const getToken = require("../helpers/GetToken");
const getUserByToken = require("../helpers/GetAdminByToken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class AccessoryController {
  static async create(req, res) {
    const { name, category, price, description } = req.body;
    const images = req.files;

    if (!name) {
      return res.status(422).json({
        message: `O nome é obrigatório`,
      });
    }
    if (!category) {
      return res.status(422).json({
        message: `A categoria é obrigatória`,
      });
    }
    if (!price) {
      return res.status(422).json({
        message: `O preço é obrigatório`,
      });
    }
    if (!description) {
      return res.status(422).json({
        message: `A descrição é obrigatória`,
      });
    }
    if (!images || images.length === 0) {
      return res.status(422).json({
        message: `A imagem é obrigatória`,
      });
    }

    try {
      const categoryDoc = await Category.findOne({ name: category });

      if (!categoryDoc) {
        return res.status(404).json({
          message: `Categoria não encontrada`,
        });
      }

      const accessory = new Accessory({
        name,
        category: categoryDoc._id,
        price,
        description,
        images,
      });

      await accessory.save();

      await accessory.populate("category");

      res.status(200).json({
        message: "Acessório criado com sucesso",
        accessory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro ao criar o acessório",
      });
    }
  }
};
