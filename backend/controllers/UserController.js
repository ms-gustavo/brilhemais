require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;
const Joi = require("joi");
const createUserToken = require("../helpers/CreateUserToken");
const getToken = require("../helpers/GetToken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // validations
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": `O nome é obrigatório`,
      }),
      email: Joi.string().required().messages({
        "any.required": `O e-mail é obrigatório`,
      }),
      password: Joi.string().required().messages({
        "any.required": `A senha é obrigatória`,
      }),
      confirmpassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "any.required": `A confirmação de senha é obrigatória`,
          "any.only": `A confirmação de senha deve ser igual à senha`,
        }),
    });
    const { error } = schema.validate({
      name,
      email,
      password,
      confirmpassword,
    });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(422).json({
        message: errorMessage,
      });
    }

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(422).json({
        message: `Por favor, utilize outro e-mail`,
      });
      return;
    }

    // Create a hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    // create a user
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().required().messages({
        "any.required": `O e-mail é obrigatório`,
      }),
      password: Joi.string().required().messages({
        "any.required": `A senha é obrigatória`,
      }),
    });
    const { error } = schema.validate({
      email,
      password,
    });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(422).json({
        message: errorMessage,
      });
    }
    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(422).json({
        message: `O usuário não existe`,
      });
      return;
    }
    // Check if password matches with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: `A senha está inválida!` });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;
    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, tokenSecret);

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }
};
