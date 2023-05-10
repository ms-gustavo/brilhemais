const createUserToken = require("../helpers/CreateUserToken");
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
};
