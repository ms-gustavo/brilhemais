require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;
const jwt = require("jsonwebtoken");
const getToken = require("./GetToken");
const i18n = require("./i18n");
i18n.setLocale("br");

// validate token
const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: i18n.__("ACCESS_DENIED"),
    });
  }

  const token = getToken(req);
  if (!token) {
    return res.status(401).json({
      message: i18n.__("ACCESS_DENIED"),
    });
  }

  try {
    const verified = jwt.verify(token, tokenSecret);
    req.user = verified;

    next();
  } catch (error) {
    return res.status(400).json({
      message: i18n.__("INVALID_TOKEN"),
    });
  }
};

module.exports = checkToken;
