const jwt = require("jsonwebtoken");
require("dotenv").config();
const i18n = require("../helpers/i18n");
i18n.setLocale("br");

const tokenSecret = process.env.TOKEN_SECRET;

const createUserToken = async (user, req, res) => {
  //create token
  const token = jwt.sign(
    {
      userName: user.name,
      userId: user._id,
      isAdmin: user.isAdmin,
    },
    tokenSecret
  );
  //return token
  res.status(200).json({
    message: i18n.__("AUTHENTICATION_SUCCESSFULLY"),
    token: token,
  });
};

module.exports = createUserToken;
