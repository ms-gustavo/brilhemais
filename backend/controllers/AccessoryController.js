const Accessory = require("../models/Accessory");
const Category = require("../models/Category");
const Joi = require("joi");

//helpers
const getToken = require("../helpers/GetToken");
const getUserByToken = require("../helpers/GetAdminByToken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class AccessoryController {
  static async create(req, res) {
    const { name, category, price, description } = req.body;
    const images = req.files;

    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": `O nome é obrigatório`,
      }),
      category: Joi.string().required().messages({
        "any.required": `A categoria é obrigatória`,
      }),
      price: Joi.number().required().messages({
        "any.required": `O preço é obrigatório`,
      }),
      description: Joi.string().required().messages({
        "any.required": `A descrição é obrigatória`,
      }),
      images: Joi.array().min(1).required().messages({
        "any.required": `A imagem é obrigatória`,
        "array.min": `A imagem é obrigatória`,
      }),
    });

    const { error } = schema.validate({
      name,
      category,
      price,
      description,
      images,
    });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(422).json({
        message: errorMessage,
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
      categoryDoc.accessories.push(accessory._id);
      await categoryDoc.save();

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
