require("dotenv").config();

const tokenSecret = process.env.TOKEN_SECRET;

const jwt = require("jsonwebtoken");

const User = require("../models/User");

// get User by jwt token
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({
      message: `Acesso negado!`,
    });
  }

  const decoded = jwt.verify(token, tokenSecret);
  const userId = decoded.id;
  const user = await User.findOne({ _id: userId });

  return user;
};

module.exports = getUserByToken;
