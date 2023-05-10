require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;

const createUserToken = require("../helpers/CreateUserToken");
const getToken = require("../helpers/GetToken");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

module.exports = class AdminController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({
        message: `Insira um email`,
      });
      return;
    }
    if (!password) {
      res.status(422).json({
        message: `Insira uma senha`,
      });
      return;
    }
    //check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(422).json({
        message: `O Admin não existe`,
      });
      return;
    }
    // check password
    if (password !== admin.password) {
      res.status(422).json({
        message: `A senha não confere`,
      });
    }

    await createUserToken(admin, req, res);
  }

  static async checkAdmin(req, res) {
    let currentAdmin;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, tokenSecret);

      currentAdmin = await Admin.findById(decoded.id);
      currentAdmin.password = undefined;
    } else {
      currentAdmin = null;
    }
    res.status(200).send(currentAdmin);
  }
};
