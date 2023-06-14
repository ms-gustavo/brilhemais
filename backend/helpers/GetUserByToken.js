require("dotenv").config();
const i18n = require("./i18n");
i18n.setLocale("br");

const tokenSecret = process.env.TOKEN_SECRET;

const jwt = require("jsonwebtoken");

const User = require("../models/User");

// get User by jwt token
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({
      message: i18n.__("ACCESS_DENIED"),
    });
  }

  const decoded = jwt.verify(token, tokenSecret);

  const userId = decoded.userId;
  const user = await User.findOne({ _id: userId });
  return user;
};

module.exports = getUserByToken;
