require("dotenv").config();
const i18n = require("./i18n");
i18n.setLocale("br");

const tokenSecret = process.env.TOKEN_SECRET;

const jwt = require("jsonwebtoken");

const User = require("../models/User");

// get User by jwt token
const getUserByToken = async (token) => {
  console.log("getuserbytoken", token);
  if (!token) {
    return res.status(401).json({
      message: i18n.__("ACCESS_DENIED"),
    });
  }
  console.log("token secret", tokenSecret);
  const decoded = jwt.verify(token, tokenSecret);
  console.log("decoded", decoded);
  const userId = decoded.id;
  const user = await User.findOne({ _id: userId });
  console.log("user getuserbytoken", user);
  return decoded;
};

module.exports = getUserByToken;
