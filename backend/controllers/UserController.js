require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;
const i18n = require("../helpers/i18n");
i18n.setLocale("br");
const createUserToken = require("../helpers/CreateUserToken");
const getToken = require("../helpers/GetToken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../helpers/UserValidations");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // validations
    const validationError = validateRegisterUser(
      name,
      email,
      password,
      confirmpassword
    );

    if (validationError) {
      return res.status(422).json({
        message: validationError,
      });
    }

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(422).json({
        message: i18n.__("EMAIL_ALREADY_EXISTS"),
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

    const validationError = validateLoginUser(email, password);

    if (validationError) {
      return res.status(422).json({
        message: validationError,
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
