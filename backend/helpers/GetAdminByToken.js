require("dotenv").config();

const tokenSecret = process.env.TOKEN_SECRET;

const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// get admin by jwt token
const getAdminByToken = async (token) => {
  if (!token) {
    return res.status(401).json({
      message: `Acesso negado!`,
    });
  }

  const decoded = jwt.verify(token, tokenSecret);
  const adminId = decoded.id;
  const admin = await Admin.findOne({ _id: adminId });

  return admin;
};

module.exports = getAdminByToken;
