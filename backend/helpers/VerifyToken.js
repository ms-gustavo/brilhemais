require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;
const jwt = require("jsonwebtoken");
const getToken = require("./GetToken");

// validate token
const checkToken = (req, res, next) => {
  console.log(req);

  if (!req.headers.authorization) {
    return res.status(401).json({
      message: `Acesso negado!`,
    });
  }

  const token = getToken(req);
  if (!token) {
    return res.status(401).json({
      message: `Acesso negado!`,
    });
  }

  try {
    const verified = jwt.verify(token, tokenSecret);
    req.admin = verified;

    next();
  } catch (error) {
    return res.status(400).json({
      message: `Token inválido`,
    });
  }
};

module.exports = checkToken;
