const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenSecret = process.env.TOKEN_SECRET;

const createUserToken = async (admin, req, res) => {
  //create token
  const token = jwt.sign(
    {
      name: admin.email,
      id: admin._id,
    },
    tokenSecret
  );
  //return token
  res.status(200).json({
    message: `Você está autenticado!`,
    token: token,
    userId: admin._id,
  });
};

module.exports = createUserToken;
