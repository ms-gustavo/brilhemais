const Carroussel = require("../models/Carroussel");
const i18n = require("../helpers/i18n");
i18n.setLocale("br");
const getToken = require("../helpers/GetToken");
const getUserByToken = require("../helpers/GetUserByToken");
const {
  validateCreateCarroussel,
} = require("../helpers/CarrousselValidations");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class CarrousselController {
  static async create(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    if (!user.isAdmin) {
      res.status(422).json({
        message: i18n.__("UNABLE_TO_PROCESS"),
      });
      return;
    }

    const name = req.body.name;
    const images = req.files;
    const validationError = validateCreateCarroussel(name, images);
    if (validationError) {
      return res.status(422).json({
        message: validationError,
      });
    }

    try {
      const carroussel = new Carroussel({
        name,
        images,
      });
      await carroussel.save();
      res.status(200).json({
        message: i18n.__("CARROUSSEL_SUCCESSFULLY_CREATED"),
        carroussel,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: i18n.__("CARROUSSEL_ERROR_CREATED"),
      });
    }
  }

  static async getAll(req, res) {
    try {
      const carroussel = await Carroussel.find().sort("-createdAt)");
      res.status(200).json({
        carroussel,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  static async getCarrousselById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: i18n.__("INVALID_ID"),
      });
      return;
    }

    const carroussel = await Carroussel.findOne({ _id: id });
    if (!carroussel) {
      res.status(404).json({
        message: i18n.__("CARROUSSEL_NOT_FOUND"),
      });
    }
    res.status(200).json({
      carroussel,
    });
  }

  static async deleteCarrousselById(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: i18n.__("INVALID_ID"),
      });
      return;
    }

    const carroussel = await Carroussel.findOne({ _id: id });
    if (!carroussel) {
      res.status(404).json({
        message: i18n.__("CARROUSSEL_NOT_FOUND"),
      });
    }

    await Carroussel.findByIdAndRemove(id);
    res.status(200).json({
      message: i18n.__("CARROUSSEL_SUCCESSFULLY_REMOVED"),
    });
  }
};
