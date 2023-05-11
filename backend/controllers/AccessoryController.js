const Accessory = require("../models/Accessory");
const Category = require("../models/Category");
const Joi = require("joi");

//helpers
const getToken = require("../helpers/GetToken");
const getUserByToken = require("../helpers/GetUserByToken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class AccessoryController {
  static async create(req, res) {
    const { name, category, price, description } = req.body;
    const images = req.files;
    // Validations
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": `O nome é obrigatório`,
      }),
      category: Joi.string().required().messages({
        "any.required": `A categoria é obrigatória`,
      }),
      price: Joi.number().required().messages({
        "any.required": `O preço é obrigatório`,
        "number.base": "O preço deve ser um número!",
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

  static async getAll(req, res) {
    try {
      const accessories = await Accessory.find()
        .sort("-createdAt")
        .populate("category", "name");

      const accessoriesWithCategoryName = accessories.map((accessory) => {
        const category = accessory.category;
        const categoryName = category ? category.name : null;
        return { ...accessory.toObject(), categoryName };
      });

      res.status(200).json({
        accessories: accessoriesWithCategoryName,
      });
    } catch (error) {
      res.status(500).json({
        message: `Ocorreu um erro ao obter os acessórios.`,
      });
    }
  }

  static async getAccessoryById(req, res) {
    const id = req.params.id;
    // check if ID is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: `ID Inválido`,
      });
      return;
    }

    // check if category exists
    const accessory = await Accessory.findOne({ _id: id });
    if (!accessory) {
      res.status(404).json({
        message: `O acessório não existe`,
      });
      return;
    }

    res.status(200).json({
      accessory,
    });
  }

  static async deleteAccessoryById(req, res) {
    const id = req.params.id;
    // check if ID is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: `ID Inválido`,
      });
      return;
    }

    // check if category exists
    const accessory = await Accessory.findOne({ _id: id });
    if (!accessory) {
      res.status(404).json({
        message: `O acessório não existe`,
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

    await Accessory.findByIdAndRemove(id);
    res.status(200).json({
      message: `Accesório excluído.`,
    });
  }

  static async updateAccessory(req, res) {
    const id = req.params.id;
    const { name, category, price, description } = req.body;
    const images = req.files;

    const updatedData = {};

    // check if Id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: `Id inválido`,
      });
      return;
    }

    //check if accessory exists
    const accessory = await Accessory.findOne({ _id: new ObjectId(id) });
    if (!accessory) {
      res.status(404).json({
        message: `Acessório inexistente`,
      });
      return;
    }
    // check if user is admin
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user.isAdmin) {
      res.status(422).json({
        message: `Houve um problema em processar a sua solicitação! Tente novamente mais tarde.`,
      });
      return;
    }

    // validations
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": `O nome é obrigatório`,
      }),
      price: Joi.number().required().messages({
        "any.required": `O preço é obrigatório`,
        "number.base": "O preço deve ser um número!",
      }),
      description: Joi.string().required().messages({
        "any.required": `A descrição é obrigatória`,
      }),
    });
    const { error, value } = schema.validate({
      name,
      price,
      description,
    });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(422).json({
        message: errorMessage,
      });
    }
    updatedData.name = value.name;
    updatedData.price = value.price;
    updatedData.description = value.description;

    if (images.length > 0) {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }
    await Accessory.findByIdAndUpdate(id, updatedData);
    res.status(200).json({
      message: `O acessório foi atualizado!`,
    });
  }
};
